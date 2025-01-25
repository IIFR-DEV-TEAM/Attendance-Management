import { json, type RequestHandler } from '@sveltejs/kit';
import { Session, type SessionType } from 'models/Session';

export const POST: RequestHandler = async ({ request }) => {
  const { date, startTime, endTime, sessionId }: Omit<SessionType, '_id'> = await request.json();

  try {
    const session = new Session({ date, startTime, endTime, sessionId }) 
    await session.save();
    return json({ success: true, message: 'Session created successfully' });
  } catch (error) {
    console.error('Error creating session:', error);
    return json({ success: false, error: 'Failed to create session' });
  }
};
