import type { APIGatewayProxyResult, SQSEvent } from "aws-lambda"
import {
  fetchPostsByUuids,
  fetchUserEmailByUuid,
  updateUserPostEntry,
} from "../db/query"

export const handler = async (
  event: SQSEvent
): Promise<APIGatewayProxyResult> => {
  const eventBody = event.Records[0].body

  const eventBodyJson = JSON.parse(eventBody)

  const userEmail = await fetchUserEmailByUuid(eventBodyJson.userId)
  const postIds = eventBodyJson.postsIds as string[]

  const postRecords = await fetchPostsByUuids(postIds)

  // Limit the number of posts to 3
  const maxPosts = 3
  const limitedPostRecords = postRecords.slice(0, maxPosts)

  // Construct HTML content for the limited number of blog posts
  const blogPostHTML = limitedPostRecords
    .map((post) => {
      // Convert the published date to a user-friendly format
      // prettier-ignore
      const publishedDate = post.publishedDate
        ? new Date(post.publishedDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        : ""

      return `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; text-align: center;">
                <h1>${post.companyName}</h1>
                <h2>${post.title}</h2>
                <p>Author: ${post.author}</p>
                <p>Published Date: ${publishedDate}</p>
                <a href="${post.link}" style="text-decoration: none;">
                    <button style="background-color: #007BFF; color: white; border: none; padding: 10px; cursor: pointer;">
                        Read more ->
                    </button>
                </a>
            </div>
        `
    })
    .join("") // Join all the limited blog post HTML content together

  // Create the "See more posts from this week" button
  const seeMoreButtonHTML = `
            <div style="text-align: center;">
                <a href="https://www.devfeed.blog" style="text-decoration: none;">
                    <button style="background-color: #007BFF; color: white; border: none; padding: 10px; cursor: pointer;">
                        See more posts ->
                    </button>
                </a>
            </div>
          `

  const emailHtml = `
        <html>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Default styles for desktop */
                h1 {
                    font-size: 24px;
                }
                p {
                    font-size: 16px;
                }

                /* Media query for mobile devices */
                @media screen and (max-width: 480px) {
                    /* Hide elements not needed in mobile notifications */
                    p {
                        display: none;
                    }
                }
            </style>
            <head></head>
            <body style="height: auto;">
            <div style="text-align: center;">
                <h2>Latest Engineering Blogs</h2>
                <div style="border-radius: 25%; overflow: hidden; width: 100px; height: 100px; margin: 10px; margin: 0 auto;">
                    <a href="https://www.devfeed.blog">
                        <img src="https://www.devfeed.blog/logo.png" alt="DevFeed Logo" style="width: 100%; height: 100%; object-fit: cover;">
                    </a>
                </div>
                </div>
                ${blogPostHTML}
                ${seeMoreButtonHTML}
            </body>
        </html>
    `

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "latest@devfeed.blog",
      to: [userEmail],
      subject: "Latest Engineering Blogs",
      html: emailHtml,
    }),
  })

  if (res.ok) {
    await updateUserPostEntry(eventBodyJson.userId, postIds)
  }

  try {
    // fetch is available with Node.js 18
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully sent email",
      }),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "some error happened",
      }),
    }
  }
}
