import { json } from '@sveltejs/kit';
import { PRIVATE_LINK } from '$env/static/private';

export async function GET() {
  

    return json({ link: PRIVATE_LINK });
}
