import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { upsertUserEntry } from "../db/query"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const reqBody = event.body ? JSON.parse(event.body) : {}

    const { email, name } = reqBody

    try {
        await upsertUserEntry({ email, username: name })
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "success"
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