import type { APIRoute } from "astro"
import { setUserEmailPref } from "@aws/backend/db/query"

export const POST: APIRoute = async ({ request }) => {
  const reqBody = await request.json()

  const { userId, newStatus } = reqBody

  try {
    await setUserEmailPref(userId, newStatus)
  } catch (err) {
    console.log(err)
    return new Response(
      JSON.stringify({
        message: "some error happened",
      })
    )
  }

  return new Response(
    JSON.stringify({
      message: "Updated email preference",
    })
  )
}
