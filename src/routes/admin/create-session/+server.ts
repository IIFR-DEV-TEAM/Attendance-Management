import { json, type RequestHandler } from '@sveltejs/kit';
import { Session, type SessionType } from 'models/Session';

export const POST: RequestHandler = async ({ request }) => {
  const { date, startTime, endTime, sessionId }: Omit<SessionType, '_id'> = await request.json();

  const normalizeTime = (time: string): string =>{
    if (time.split(':').length === 3) {
      return time;
    }
    return `${time}:00`;
  }

  if (!date || !startTime || !endTime || !sessionId) {
    return json({ success: false, error: 'All fields are required.' });
  }

  try {
    const existingSession = await Session.findOne({ sessionId });
    if (existingSession) {
      return json({ success: false, error: 'Session ID already exists.' });
    }
    const normalizedStartTime = normalizeTime(startTime);
    const normalizedEndTime = normalizeTime(endTime);
    const session = new Session({ date, startTime:normalizedStartTime, endTime:normalizedEndTime, sessionId });
    await session.save();
    return json({ success: true, message: 'Session created successfully' });
  } catch (error) {
    console.error('Error creating session:', error);
    return json({ success: false, error: 'Failed to create session' });
  }
};
