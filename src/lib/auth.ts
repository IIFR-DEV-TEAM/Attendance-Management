import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
export interface JWTUserPayload {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
}

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateJWT = (payload: JWTUserPayload) => {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: '1h' });
};

export const verifyJWT = (token: string): JWTUserPayload => {
  try {
    return jwt.verify(token, JWT_SECRET as string) as JWTUserPayload;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};
