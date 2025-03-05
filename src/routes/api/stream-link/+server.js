import { json } from '@sveltejs/kit';
import { PRIVATE_LINK } from '$env/static/private';

export async function GET() {
    if (!PRIVATE_LINK) {
        console.error("❌ Error: Stream link is missing in environment variables!");
        return json({ error: "Stream link is missing" }, { status: 500 });
    }

    return json({ link: PRIVATE_LINK });
}
