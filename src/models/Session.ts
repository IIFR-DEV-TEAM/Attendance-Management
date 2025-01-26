import mongoose, { Schema, Document, Model } from 'mongoose';

interface SessionType extends Document{
  date: string;
  startTime: string;
  endTime: string;
  sessionId: string;
}

const SessionSchema = new Schema<SessionType>({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  sessionId: { type: String, required: true, unique: true }
});
let Session: Model<SessionType>
try {
  Session = mongoose.model<SessionType>('session'); 
} catch {
  Session = mongoose.model<SessionType>('session', SessionSchema);
}

export { Session };
export type { SessionType };