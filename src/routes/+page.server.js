import { json } from '@sveltejs/kit';
import { link } from '$env/static/private';

export async function GET() {
    return json({ link }); // Only accessible via server request
}
