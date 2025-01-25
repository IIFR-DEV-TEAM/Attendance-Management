import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	const user = locals.user;

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	return json({
		message: 'User is authenticated',
		user: {
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			isAdmin: user.isAdmin
		}
	});
};
