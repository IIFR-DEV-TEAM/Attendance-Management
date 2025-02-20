import { json, type RequestHandler } from '@sveltejs/kit';
import connectDB from '$lib/db';
import { comparePassword, generateJWT } from '$lib/auth';
import {User} from 'models/User';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { userId, password } = await request.json();
    await connectDB();

    const user = await User.findOne({ userId });

    if (!user) {
      return json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const token = generateJWT({
      userId: user.userId,
      name:user.name,
      email: user.email,
      admin: user.admin
    });

    cookies.set('sessionid', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7
    });

    return json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return json({ error: 'Error logging in' }, { status: 500 });
  }
};
