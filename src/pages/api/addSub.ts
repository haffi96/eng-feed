import type { APIRoute } from "astro"
import { createUserBlogEntry } from "@aws/backend/db/query"

export const POST: APIRoute = async ({ request }) => {
  const reqBody = await request.json()

  const { userId, blogId } = reqBody

  try {
    await createUserBlogEntry(userId, blogId)
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
      message: "success",
    })
  )
}
