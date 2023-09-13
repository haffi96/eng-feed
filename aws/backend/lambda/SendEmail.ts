import { APIGatewayProxyResult } from "aws-lambda"

export const handler = async (): Promise<APIGatewayProxyResult> => {
    try {
        // fetch is available with Node.js 18
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Hello lambda!",
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