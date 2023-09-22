import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import "source-map-support/register"
// import * as ec2 from "aws-cdk-lib/aws-ec2"
// import * as rds from "aws-cdk-lib/aws-rds"
import * as sqs from "aws-cdk-lib/aws-sqs"
import * as sns from "aws-cdk-lib/aws-sns"
import * as snsSubscriptions from "aws-cdk-lib/aws-sns-subscriptions"
import * as events from "aws-cdk-lib/aws-events"
import * as targets from "aws-cdk-lib/aws-events-targets"
// import { Secret } from "aws-cdk-lib/aws-secretsmanager"
import * as lambdaEventSources from "aws-cdk-lib/aws-lambda-event-sources"
import { GenericLambda } from "./lambda"
import { ApiGateway } from "./apiGateway"
import { CfnOutput } from "aws-cdk-lib"

export class TestStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        // We know this VPC already exists (Needed for database testing locally)
        // const defaultVpc = ec2.Vpc.fromLookup(this, "default-vpc", { vpcId: "vpc-004c22d6b0586f89a" })

        // Fetch security group from existing security group ID
        // const securityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, "test-sg-group", "sg-04a2f17075bbb4551")

        // const dbPort = 5432

        // Add Inbound rule for testing
        // securityGroup.addIngressRule(
        //     ec2.Peer.anyIpv4(),
        //     ec2.Port.tcp(dbPort),
        //     "Allow port 5432 for database connection from anywhere"
        // )

        // Add Inbound rule
        // securityGroup.addIngressRule(
        //     ec2.Peer.ipv4(defaultVpc.vpcCidrBlock),
        //     ec2.Port.tcp(dbPort),
        //     `Allow port ${dbPort} for database connection from only within the VPC (${defaultVpc.vpcId})`
        //   );

        // TODO: Uncomment this when ready to deploy. Costs alot so using
        // Create DB secrets
        // const masterUserSecret = new Secret(this, "test-db-secret", {
        //     secretName: "test-db-secret",
        //     description: "Database master user credentials",
        //     generateSecretString: {
        //         secretStringTemplate: JSON.stringify({ username: "postgres" }),
        //         generateStringKey: "password",
        //         passwordLength: 16,
        //         excludePunctuation: true,
        //     },
        // });

        // Create a PostgreSQL RDS instance with the specified security group
        // supabase for now
        // const dbInstance = new rds.DatabaseInstance(this, 'feed', {
        // engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_15_4 }),
        // instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
        // credentials: rds.Credentials.fromSecret(masterUserSecret),
        // vpc: defaultVpc,
        // vpcSubnets : { subnetType: ec2.SubnetType.PUBLIC }, // Use public subnets for testing
        // port: dbPort,
        // securityGroups: [securityGroup], // Attach the security group
        // });

        // Create an SQS Queue
        const queue = new sqs.Queue(this, "test-sqs-queue")

        // Create an SNS Topic
        const snsTopic = new sns.Topic(this, "test-sns-topic")

        // Api Gateway setup
        const api = new ApiGateway(this)

        // Lambda function to be scheduled for fetching new posts and inserting to db
        const fetchPostsLambda = new GenericLambda(this, "FetchAndInsertPosts")
        const fetchPostsRule = new events.Rule(this, "PostsRule", {
            schedule: events.Schedule.cron({ minute: "0", hour: "8" }), // Adjust the schedule as needed
        })
        fetchPostsRule.addTarget(new targets.LambdaFunction(fetchPostsLambda))

        // Lambda function to notify users
        const fetchUserToNotify = new GenericLambda(this, "NotifyUsers")
        const fetchUserToNotifyRule = new events.Rule(this, "fetchUserToNotifyRule", {
            schedule: events.Schedule.cron({ minute: "0", hour: "9" }), // Adjust the schedule as needed
        })
        fetchUserToNotifyRule.addTarget(new targets.LambdaFunction(fetchUserToNotify))

        // Grant Lambda permissions to read from the RDS instance and send messages to SQS
        // dbInstance.grantConnect(postsLambda);
        queue.grantSendMessages(fetchUserToNotify)

        // Create a Lambda function for sending emails
        const sendEmailLambda = new GenericLambda(this, "SendEmail")

        // Subscribe the SNS Topic to Send Email Lambda
        snsTopic.addSubscription(new snsSubscriptions.LambdaSubscription(sendEmailLambda))

        // API Lambdas
        const postsLambda = new GenericLambda(this, "Posts")
        const getSubscribedBlogsLambda = new GenericLambda(this, "GetSubscribedBlogs")
        const upsertUserLambda = new GenericLambda(this, "upsertUser")
        const addUserSubscriptionLambda = new GenericLambda(this, "addUserSubscription")


        // API Routes
        api.addIntegration("GET", "/posts", postsLambda)
        api.addIntegration("GET", "/subscribed-blogs", getSubscribedBlogsLambda)
        api.addIntegration("POST", "/user", upsertUserLambda)
        api.addIntegration("POST", "/subscribe", addUserSubscriptionLambda)

        // Create an SQS event source for NotifyUsers Lambda to process messages from the queue
        const eventSource = new lambdaEventSources.SqsEventSource(queue, { batchSize: 1 })
        sendEmailLambda.addEventSource(eventSource)


        // Export values
        new CfnOutput(this, "SQSQueueUrl", {
            value: queue.queueUrl,
        })
    }
}
