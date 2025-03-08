import { login } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const token = await login(email, password);

		if (token) {
			cookies.set('session', token, {
				path: '/',  //  Required
				maxAge: 60 * 60 * 24 * 7, 
				httpOnly: true,
				sameSite: 'strict'
			});

			//  Correct way to redirect in SvelteKit
			throw redirect(302, '/');
		}

		return {
			success: false,
			message: 'Login failed'
		};
	}
};
