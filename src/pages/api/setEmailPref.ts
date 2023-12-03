import type { APIRoute } from "astro"
import { setUserEmailPref } from "@aws/backend/db/query"

export const POST: APIRoute = async ({ request }) => {
    const reqBody = await request.json();

    const { userEmail, enabled } = reqBody;

    try {
        await setUserEmailPref(userEmail);
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({
            message: "some error happened"
        })
        )
    }

    return new Response(JSON.stringify({
        message: "Updated email preference"
    })
    )
}