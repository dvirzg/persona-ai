import { auth } from '@/app/(auth)/auth';
import { models } from '@/lib/ai/models';
import { systemPrompt } from '@/lib/ai/prompts';
import { getChatById, saveChat, saveMessages, deleteChatById } from '@/lib/db/queries';
import { generateUUID, getMostRecentUserMessage } from '@/lib/utils';
import { generateTitleFromUserMessage } from '../../actions';

// Get the message processing service URL from environment variable
const MESSAGE_PROCESSOR_URL = process.env.MESSAGE_PROCESSOR_URL;
if (!MESSAGE_PROCESSOR_URL) {
  throw new Error('MESSAGE_PROCESSOR_URL environment variable is not set');
}
const API_KEY = process.env.BACKEND_API_KEY;
if (!API_KEY) {
  throw new Error('BACKEND_API_KEY environment variable is not set');
}

// Now TypeScript knows these variables are defined
const apiKey: string = API_KEY;
const processorUrl: string = MESSAGE_PROCESSOR_URL;

export const maxDuration = 60;

// Helper function to convert UI messages to core messages
function convertToCoreMessages(messages: any[]): any[] {
  return messages.map(message => ({
    role: message.role,
    content: message.content,
  })).filter(msg => msg.role !== 'system' && msg.role !== 'data');
}

export async function POST(request: Request) {
  const { id, messages, modelId } = await request.json();

  const session = await auth();

  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const model = models.find((model) => model.id === modelId);

  if (!model) {
    return new Response('Model not found', { status: 404 });
  }

  const coreMessages = convertToCoreMessages(messages);
  const userMessage = getMostRecentUserMessage(coreMessages);

  if (!userMessage) {
    return new Response('No user message found', { status: 400 });
  }

  const chat = await getChatById(id);

  if (!chat) {
    const title = await generateTitleFromUserMessage({ message: userMessage });
    await saveChat({ id, userId: session.user.id, title });
  }

  const userMessageId = generateUUID();

  // Save the user message first
  await saveMessages({
    messages: [
      { id: userMessageId, chatId: id, role: userMessage.role, content: userMessage.content, createdAt: new Date() }
    ]
  });

  // Create a TransformStream for streaming the response
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Start processing in the background
  (async () => {
    try {
      // Send user message ID
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ type: 'user-message-id', content: userMessageId })}\n\n`)
      );

      // Call our Python message processing service
      const response = await fetch(`${processorUrl}/process-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          user_message: userMessage.content,
          chat_id: id,
          user_id: session.user.id,
          message_history: coreMessages,
          system_prompt: systemPrompt,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        throw new Error(`Failed to process message: ${errorText}`);
      }

      const result = await response.json();

      if (result.status === 'error') {
        throw new Error(result.error);
      }

      // Get the assistant's message
      const assistantMessage = result.assistant_message;
      
      // Send assistant message ID
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ type: 'assistant-message-id', content: assistantMessage.id })}\n\n`)
      );

      // Send the content
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ type: 'text', content: assistantMessage.content })}\n\n`)
      );

      // Save the assistant's message
      await saveMessages({
        messages: [{
          id: assistantMessage.id,
          chatId: id,
          role: 'assistant',
          content: assistantMessage.content,
          createdAt: new Date(assistantMessage.created_at)
        }]
      });

      // Send done event
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ type: 'done', content: null })}\n\n`)
      );

    } catch (error) {
      console.error('Error processing message:', error);
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ type: 'error', content: 'An error occurred while processing your message.' })}\n\n`)
      );
    } finally {
      await writer.close();
    }
  })();

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Chat ID is required', { status: 400 });
  }

  const session = await auth();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const chat = await getChatById(id);
    
    if (!chat) {
      return new Response('Chat not found', { status: 404 });
    }

    if (chat.userId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    await deleteChatById(id);
    return new Response('Chat deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Failed to delete chat:', error);
    return new Response('Failed to delete chat', { status: 500 });
  }
}
