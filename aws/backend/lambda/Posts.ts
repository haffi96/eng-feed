import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { fetchAllPostsForUser, fetchAllPosts } from "../db/query"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const params = event.queryStringParameters
    const userEmail = params?.userEmail
    const offset = params?.offset ? parseInt(params.offset) : 0
    const limit = params?.limit ? parseInt(params.limit) : 10

    try {

        const posts = userEmail
            ? await fetchAllPostsForUser({ userEmail, offset, limit })
            : await fetchAllPosts({ offset, limit })
        return {
            statusCode: 200,
            body: JSON.stringify(posts),
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