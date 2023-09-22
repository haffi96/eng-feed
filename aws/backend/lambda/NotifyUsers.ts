import { fetchTodaysUsersToNotify } from "../db/query"
import { SQSClient, SendMessageBatchCommand, SendMessageBatchCommandInput } from "@aws-sdk/client-sqs"
// import * as cdk from "aws-cdk-lib/core"
import { v4 as uuidv4 } from "uuid"

// SQS Confiig
const sqsClient = new SQSClient({ region: "eu-west-2" })

export const handler = async () => {
    try {
        const user_posts = await fetchTodaysUsersToNotify()
        const obj = Object.fromEntries(user_posts)

        const messageId = uuidv4()

        const input: SendMessageBatchCommandInput = {
            QueueUrl: process.env.SQS_QUEUE_URL,
            Entries: Object.entries(obj).map((entry) => ({
                Id: messageId,
                MessageBody: JSON.stringify(entry),
                DelaySeconds: 0,
                MessageAttributes: {
                    key: {
                        StringValue: messageId,
                        DataType: "String",
                    },
                },
            })),
        }

        const command = new SendMessageBatchCommand(input)
        await sqsClient.send(command)

        return {
            statusCode: 200,
            body: JSON.stringify(obj),
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: err,
            }),
        }
    }
}