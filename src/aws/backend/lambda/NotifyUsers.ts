import { fetchUsersToNotify } from "../db/query"
import {
  SQSClient,
  SendMessageBatchCommand,
  type SendMessageBatchCommandInput,
} from "@aws-sdk/client-sqs"
import { v4 as uuidv4 } from "uuid"

// SQS Confiig
const sqsClient = new SQSClient({ region: "eu-west-2" })

export const handler = async () => {
  try {
    const user_posts = await fetchUsersToNotify()

    if (user_posts.size === 0) {
      return JSON.stringify({ message: "No users to notify" })
    }

    const obj = Object.fromEntries(user_posts)

    const messageId = uuidv4()

    const input: SendMessageBatchCommandInput = {
      QueueUrl: process.env.SQS_QUEUE_URL,
      Entries: Object.entries(obj).map((entry) => ({
        Id: messageId,
        MessageBody: JSON.stringify({
          userId: entry[0],
          postsIds: entry[1],
        }),
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
