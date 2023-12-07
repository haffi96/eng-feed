import type { APIRoute } from "astro"
import { getUserEmailPref } from "@aws/backend/db/query"

export const GET: APIRoute = async ({ request }) => {

    const reqParams = new URL(request.url).searchParams;

    const userId = reqParams.get("userId");

    try {
        const emailPref = await getUserEmailPref(userId!);
        return new Response(JSON.stringify({
            emailPref: emailPref
        }))
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({
            message: "some error happened"
        })
        )
    }
}
