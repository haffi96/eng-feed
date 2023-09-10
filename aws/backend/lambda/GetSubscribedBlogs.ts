import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { fetchUserSubscribedBlogs } from '../db/query'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const params = event.queryStringParameters;
    const userId = params?.userId ? parseInt(params.userId) : null;

    try {
        const subscribedBlogs = await fetchUserSubscribedBlogs(userId!)
        console.log(subscribedBlogs);
        return {
            statusCode: 200,
            body: JSON.stringify(subscribedBlogs),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};