import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { deleteUserBlogEntry } from "../db/query"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const reqBody = event.body ? JSON.parse(event.body) : {}

    const { email, blogId } = reqBody

    try {
        await deleteUserBlogEntry(email, blogId)
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Unsubscribed"
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