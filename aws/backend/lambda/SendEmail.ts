import { APIGatewayProxyResult, SQSEvent } from "aws-lambda"
import { fetchuEmailserByUuid, fetchPostById } from "../db/query"

export const handler = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
    const eventBody = event.Records[0].body

    // const eventBodyJson = JSON.parse(eventBody)
    const user = eventBody[0]

    const posts = eventBody[1]

    console.log(user)
    const userEmail = await fetchuEmailserByUuid(user)
    console.log(userEmail)
    console.log(posts)

    // posts.forEach(async (post: string) => {
    //     const postRecord = await fetchPostById(post)
    //     console.log(postRecord)
    // }
    // )

    try {
        // fetch is available with Node.js 18
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: event,
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