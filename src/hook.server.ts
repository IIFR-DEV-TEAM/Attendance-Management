import type { Handle } from '@sveltejs/kit';
import { verifyJWT } from '$lib/auth';
import type { UserType } from 'models/User';
import { goto } from '$app/navigation';

export const handle: Handle = async ({ event, resolve }) => {
  const authHeader = event.request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1] ?? event.cookies.get('sessionid');

  if (token) {
    try {
      const decoded = verifyJWT(token) as UserType;
      event.locals.user = {
        id: decoded.userId,
        firstname: decoded.firstname,
        lastname: decoded.lastname,
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
		goto("/")
      return new Response('Unauthorized: Please log in.', { status: 401 });
    }

    if (route.role === 'admin' && !user.isAdmin) {
		goto("/")
      return new Response('Forbidden: Admins only.', { status: 403 });
    }
  }

  return resolve(event);
};
