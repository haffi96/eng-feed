import type { APIRoute } from "astro"

const { API_URL } = import.meta.env;

export const POST: APIRoute = async ({ request }) => {
    const reqBody = await request.json();

    const { userEmail, blogId } = reqBody;

    fetch(`${API_URL}/subscribe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: userEmail,
            blogId
        })
    })
        .then()
        .catch((err) => {
            console.log(err);
        })

    return new Response(JSON.stringify({
        message: "success"
    })
    )
}