import { type Message, type CoreMessage, type CoreToolMessage, type CoreUserMessage, type TextPart, type ToolCallPart, createDataStreamResponse, streamText } from 'ai';
import { auth } from '@/app/(auth)/auth';
import { customModel } from '@/lib/ai';
import { models } from '@/lib/ai/models';
import { systemPrompt } from '@/lib/ai/prompts';
import { getChatById, saveChat, saveMessages, deleteChatById } from '@/lib/db/queries';
import { generateUUID, getMostRecentUserMessage, sanitizeResponseMessages } from '@/lib/utils';
import { generateTitleFromUserMessage } from '../../actions';

export const maxDuration = 60;

type ValidCoreMessage = CoreMessage | CoreToolMessage | CoreUserMessage;

// Helper function to convert UI messages to core messages
function convertToCoreMessages(messages: Message[]): ValidCoreMessage[] {
  return messages.map(message => {
    if (message.role === 'user') {
      return {
        role: 'user',
        content: message.content,
      } as CoreUserMessage;
    }

    if (message.role === 'assistant') {
      return {
        role: 'assistant',
        content: message.content,
      } as CoreMessage;
    }

    if (message.role === 'system' || message.role === 'data') {
      // Don't include system or data messages from history
      return null;
    }

    return {
      role: message.role,
      content: message.content,
    } as ValidCoreMessage;
  }).filter((msg): msg is ValidCoreMessage => msg !== null);
}

function extractTextContent(content: string | TextPart | ToolCallPart | (TextPart | ToolCallPart)[]): string {
  if (typeof content === 'string') {
    return content;
  }
  
  if (Array.isArray(content)) {
    return content.map(part => {
      if ('text' in part) {
        return part.text;
      }
      if ('content' in part && typeof part.content === 'string') {
        return part.content;
      }
      return JSON.stringify(part);
    }).join('\n');
  }
  
  if ('text' in content) {
    return content.text;
  }

  if ('content' in content && typeof content.content === 'string') {
    return content.content;
  }
  
  return JSON.stringify(content);
}

export async function POST(request: Request) {
  const { id, messages, modelId }: { id: string; messages: Array<Message>; modelId: string } = await request.json();

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const model = models.find((model) => model.id === modelId);

  if (!model) {
    return new Response('Model not found', { status: 404 });
  }

  const coreMessages = convertToCoreMessages(messages);
  const userMessage = getMostRecentUserMessage(coreMessages) as CoreUserMessage;

  if (!userMessage) {
    return new Response('No user message found', { status: 400 });
  }

  const chat = await getChatById(id);

  if (!chat) {
    const title = await generateTitleFromUserMessage({ message: userMessage });
    await saveChat({ id, userId: session.user.id, title });
  }

  const userMessageId = generateUUID();

  await saveMessages({
    messages: [
      { id: userMessageId, chatId: id, role: userMessage.role, content: userMessage.content, createdAt: new Date() }
    ]
  });

  return createDataStreamResponse({
    execute: (dataStream) => {
      dataStream.writeData({
        type: 'user-message-id',
        content: userMessageId,
      });

      const result = streamText({
        model: customModel(model.apiIdentifier),
        system: systemPrompt,
        messages: coreMessages,
        maxSteps: 5,
        onFinish: async ({ response }) => {
          if (session.user?.id) {
            try {
              const responseMessagesWithoutIncompleteToolCalls = sanitizeResponseMessages(response.messages);

              // Process and save assistant messages
              const messagesToSave = responseMessagesWithoutIncompleteToolCalls
                .filter(message => message.role === 'assistant')
                .map(message => {
                  const messageId = generateUUID();
                  dataStream.writeMessageAnnotation({
                    messageIdFromServer: messageId,
                  });

                  // Extract text content from assistant message
                  const content = extractTextContent(message.content);

                  return {
                    id: messageId,
                    chatId: id,
                    role: message.role,
                    content: content,
                    createdAt: new Date(),
                  };
                });

              if (messagesToSave.length > 0) {
                await saveMessages({ messages: messagesToSave });
              } else {
                console.error('No assistant messages to save');
              }
            } catch (error) {
              console.error('Failed to save chat:', error);
            }
          }
        },
      });

      result.mergeIntoDataStream(dataStream);
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

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // First verify the chat belongs to the user
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
