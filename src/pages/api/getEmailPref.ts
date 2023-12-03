import type { APIRoute } from "astro"
import { getUserEmailPref } from "@aws/backend/db/query"

export const GET: APIRoute = async ({ request }) => {

    const reqParams = new URL(request.url).searchParams;

    const userEmail = reqParams.get("email");


    try {
        const emailPref = await getUserEmailPref(userEmail!);
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
