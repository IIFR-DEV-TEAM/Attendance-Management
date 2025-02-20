import { redirect, type Handle } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';
import type { UserType } from 'models/User';
interface DecodedJWT {
  userId: string;
  name:string;
  email: string;
  admin: boolean;
  iat: number;
  exp: number;
}
export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("sessionid")
  if (token) {
    try {
      const decoded = jwtDecode(token) as  DecodedJWT
      event.locals.user = {
        id: decoded.userId,
        name: decoded.name,
        isAdmin: decoded.admin,
        email: decoded.email
      };
    } catch (error) {
      console.error('Invalid or expired token:', error);
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  const protectedRoutes = [
    { path: '/admin', role: 'admin' },
    { path: '/student', role: 'student' }
  ];

  const route = protectedRoutes.find((r) => event.url.pathname.startsWith(r.path));

  if (route) {
    const user = event.locals.user;
    if (!user) {
		redirect(303,"/login")
      return new Response('Unauthorized: Please log in.', { status: 401 });
    }

    if (route.role === 'admin' && !user.isAdmin) {
      redirect(303,"/login")
      return new Response('Forbidden: Admins only.', { status: 403 });
    }
  }
  const response = await resolve(event)
  return response
};
