import { createConnection } from '$lib/db/mysql';

export const handle = async ({ event, resolve }) => {
	// Get session token from cookies
	const session = event.cookies.get('session');

	if (!session) {
		// No session, load page normally
		return await resolve(event);
	}

	// Find the user based on the session token
	const db = await createConnection();
	const [users] = await db.execute('SELECT * FROM users WHERE session_token = ?', [session]);

	if (users.length === 0) {
		// No user found? Delete session
		event.cookies.set('session', '', {
			path: '/',  // ✅ Required
			maxAge: -1
		});
		return await resolve(event);
	}

	// ✅ Store user in event.locals
	event.locals.user = users[0];

	// ✅ Ensure cookie is always set
	const response = await resolve(event);
	response.headers.set('set-cookie', `session=${session}; Path=/; HttpOnly; SameSite=Strict`);
	return response;
};
