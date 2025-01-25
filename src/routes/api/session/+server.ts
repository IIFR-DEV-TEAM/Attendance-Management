import { json, type RequestHandler } from '@sveltejs/kit';
import { Session } from 'models/Session';
import {Attendance} from "models/Attendance"
export const GET: RequestHandler = async () => {
  try {
    const sessions = await Session.find().sort({ date: 1, startTime: 1 });
    return json({sessions});
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return json({ success: false, error: 'Failed to fetch sessions' });
  }
};
