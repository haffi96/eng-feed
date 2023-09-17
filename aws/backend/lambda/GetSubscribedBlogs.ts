import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { fetchUserBlogsWithSubscriptionStatus, fetchAllBlogs } from "../db/query"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const params = event.queryStringParameters
    const userEmail = params?.userEmail

    try {
        const subscribedBlogs = userEmail
            ? await fetchUserBlogsWithSubscriptionStatus(userEmail)
            : await fetchAllBlogs()
        return {
            statusCode: 200,
            body: JSON.stringify(subscribedBlogs),
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