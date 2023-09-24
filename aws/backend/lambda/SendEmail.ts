import { APIGatewayProxyResult, SQSEvent } from "aws-lambda"
import { fetchUserEmailByUuid, fetchPostsByUuids } from "../db/query"

export const handler = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
    const eventBody = event.Records[0].body

    const eventBodyJson = JSON.parse(eventBody)

    const userEmail = await fetchUserEmailByUuid(eventBodyJson.userId)
    const postIds = eventBodyJson.postsIds as string[]
    console.log(userEmail)

    const postRecords = await fetchPostsByUuids(postIds)

    console.log(postRecords)

    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
            from: "latest@devfeed.blog",
            to: ["haffimazhar96@gmail.com"],
            subject: "Latest Engineering Blogs",
            html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
        }),
    })

    console.log(res.status)
    console.log(res.text())


    try {
        // fetch is available with Node.js 18
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: postRecords,
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