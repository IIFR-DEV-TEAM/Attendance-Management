import mongoose, { Schema, Document } from 'mongoose';

interface SessionType extends Document {
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

export const Session = mongoose.models.Session<SessionType> || mongoose.model<SessionType>('Session', SessionSchema);
export type {SessionType}