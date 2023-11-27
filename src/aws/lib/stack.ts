import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import "source-map-support/register"
import * as sqs from "aws-cdk-lib/aws-sqs"
import * as sns from "aws-cdk-lib/aws-sns"
import * as snsSubscriptions from "aws-cdk-lib/aws-sns-subscriptions"
import * as events from "aws-cdk-lib/aws-events"
import * as targets from "aws-cdk-lib/aws-events-targets"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment"
import * as iam from "aws-cdk-lib/aws-iam"
import * as lambdaEventSources from "aws-cdk-lib/aws-lambda-event-sources"
import { GenericLambda } from "./lambda"
import { CfnOutput } from "aws-cdk-lib"
import { join as pathJoin, dirname } from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = dirname(__filename); // get the name of the directory


export class DevFeedStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        // Create an SQS Queue
        const queue = new sqs.Queue(this, "notifications-sqs-queue")

        // Create an SNS Topic
        const snsTopic = new sns.Topic(this, "notifications-sns-topic")

        // Lambda function to be scheduled for fetching new posts and inserting to db
        const fetchPostsLambda = new GenericLambda(this, "FetchAndInsertPosts")
        const fetchPostsRule = new events.Rule(this, "PostsRule", {
            schedule: events.Schedule.cron({ minute: "0", hour: "8" }),
        })
        fetchPostsRule.addTarget(new targets.LambdaFunction(fetchPostsLambda))

        // Lambda function to notify users
        const fetchUserToNotify = new GenericLambda(this, "NotifyUsers")

        // Lambda schedule rule for notifying users
        const cron_exp = { minute: "0", hour: "9", weekDay: "FRI" }
        const fetchUserToNotifyRule = new events.Rule(this, "fetchUserToNotifyRule", {
            schedule: events.Schedule.cron(cron_exp),
        })
        fetchUserToNotifyRule.addTarget(new targets.LambdaFunction(fetchUserToNotify))

        // Grant Lambda permissions to read from the RDS instance and send messages to SQS
        // dbInstance.grantConnect(postsLambda);
        queue.grantSendMessages(fetchUserToNotify)

        // Create a Lambda function for sending emails
        const sendEmailLambda = new GenericLambda(this, "SendEmail")

        // Subscribe the SNS Topic to Send Email Lambda
        snsTopic.addSubscription(new snsSubscriptions.LambdaSubscription(sendEmailLambda))

        // Create an SQS event source for NotifyUsers Lambda to process messages from the queue
        const eventSource = new lambdaEventSources.SqsEventSource(queue)
        sendEmailLambda.addEventSource(eventSource)


        // s3 bucket for storing assets
        const assetsBucket = new s3.Bucket(this, "AssetsBucket", {
            removalPolicy: cdk.RemovalPolicy.DESTROY, // Remove the bucket when the CDK app is destroyed (for testing purposes)
            versioned: true, // Set to true if you want versioning
            objectOwnership: s3.ObjectOwnership.OBJECT_WRITER,
            blockPublicAccess: new s3.BlockPublicAccess({
                blockPublicAcls: false,
                ignorePublicAcls: false,
                blockPublicPolicy: false,
                restrictPublicBuckets: false,
            })
        })

        // Define the bucket policy
        const assetsBucketPolicy = new s3.BucketPolicy(this, "MyBucketPolicy", {
            bucket: assetsBucket,
        })

        // Allow public read access to all objects in the bucket
        assetsBucketPolicy.document.addStatements(
            new iam.PolicyStatement({
                sid: "PublicReadGetObject",
                effect: iam.Effect.ALLOW,
                actions: ["s3:GetObject"],
                resources: [assetsBucket.arnForObjects("*")],
                principals: [new iam.AnyPrincipal()],
            }),
        )

        // Specify assets to deploy to the bucket
        new s3Deployment.BucketDeployment(this, "DeployAssets", {
            sources: [s3Deployment.Source.asset(pathJoin(__dirname, "../assets"))],
            destinationBucket: assetsBucket,
        })

        // Export values
        new CfnOutput(this, "SQSQueueUrl", {
            value: queue.queueUrl,
        })
    }
}
