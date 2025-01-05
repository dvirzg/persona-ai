import { auth } from '@/app/(auth)/auth';
import { getChatById, getMessagesByChatId } from '@/lib/db/queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get('chatId');

  if (!chatId) {
    return new Response('Missing chatId', { status: 400 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // First check if the chat exists and belongs to the user
    const chat = await getChatById(chatId);
    if (!chat || chat.userId !== session.user.id) {
      return new Response('Not Found', { status: 404 });
    }

    // Then get the messages
    const messages = await getMessagesByChatId(chatId);
    // Return empty array if no messages found, instead of 404
    return Response.json(messages || []);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 