import { json } from '@sveltejs/kit';
import { PRIVATE_LINK, BASIC_AUTH_PASSWORD, BASIC_AUTH_USER } from '$env/static/private';

async function authenticate(request) {
    const auth = request.headers.get('authorization');
    if (!auth) {
        return new Response(null, {
            status: 401,
            headers: { 'www-authenticate': 'Basic realm="Protected Stream"' }
        });
    }

    const base64Credentials = auth.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');

    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
        return new Response(JSON.stringify({ message: 'Access denied' }), {
            status: 401,
            headers: { 'www-authenticate': 'Basic realm="Protected Stream"' }
        });
    }

    return null; // Authentication successful
}

export async function GET({ request }) {
    const authResponse = await authenticate(request);
    if (authResponse) return authResponse; // Return 401 if authentication fails

    if (!PRIVATE_LINK) {
        console.error("❌ Error: Stream link is missing in environment variables!");
        return json({ error: "Stream link is missing" }, { status: 500 });
    }

    return json({ link: PRIVATE_LINK });
}
