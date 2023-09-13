import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { fetchAllPostsForUser } from "../db/query"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const params = event.queryStringParameters
    const userId = params?.userId ? parseInt(params.userId) : null
    const offset = params?.offset ? parseInt(params.offset) : 0
    const limit = params?.limit ? parseInt(params.limit) : 10

    try {
        const posts = await fetchAllPostsForUser({ userId: userId!, offset, limit })
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