import type { APIRoute } from "astro"
import { createUserBlogEntry } from "@aws/backend/db/query"

export const POST: APIRoute = async ({ request }) => {
    const reqBody = await request.json();

    const { userEmail, blogId } = reqBody;

    try {
        await createUserBlogEntry(userEmail, blogId);
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({
            message: "some error happened"
        })
        )
    }

    return new Response(JSON.stringify({
        message: "success"
    })
    )
}