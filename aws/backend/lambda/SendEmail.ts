import { APIGatewayProxyResult, SQSEvent } from "aws-lambda"

export const handler = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
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