// FIXME: Remove this, directly calling from UI now
// FIXME: Remove this, directly calling from UI now
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { createUserBlogEntry } from "../db/query"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const reqBody = event.body ? JSON.parse(event.body) : {}

    const { email, blogId } = reqBody

    try {
        await createUserBlogEntry(email, blogId)
        return {
            statusCode: 200,
            body: JSON.stringify({
                reqBody
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