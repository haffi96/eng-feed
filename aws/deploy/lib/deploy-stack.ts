import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import 'source-map-support/register';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as snsSubscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';

export class DeployTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // We know this VPC already exists
    const defaultVpc = ec2.Vpc.fromLookup(this, "default-vpc", { vpcId: "vpc-004c22d6b0586f89a" });

    // Fetch security group from existing security group ID
    const securityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, 'test-sg-group', 'sg-04a2f17075bbb4551');

    const dbPort = 5432;

    // Add Inbound rule for testing
    securityGroup.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(dbPort),
        'Allow port 5432 for database connection from anywhere'
        );

    // Add Inbound rule
    // securityGroup.addIngressRule(
        //     ec2.Peer.ipv4(defaultVpc.vpcCidrBlock),
        //     ec2.Port.tcp(dbPort),
        //     `Allow port ${dbPort} for database connection from only within the VPC (${defaultVpc.vpcId})`
        //   );

    // Create DB secrets
    const masterUserSecret = new Secret(this, "test-db-secret", {
        secretName: "test-db-secret",
        description: "Database master user credentials",
        generateSecretString: {
            secretStringTemplate: JSON.stringify({ username: "postgres" }),
            generateStringKey: "password",
            passwordLength: 16,
            excludePunctuation: true,
        },
    });


    // Create a PostgreSQL RDS instance with the specified security group
    const dbInstance = new rds.DatabaseInstance(this, 'feed', {
    engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_15_4 }),
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
    credentials: rds.Credentials.fromSecret(masterUserSecret),
    vpc: defaultVpc,
    vpcSubnets : { subnetType: ec2.SubnetType.PUBLIC }, // Use public subnets for testing
    port: dbPort,
    securityGroups: [securityGroup], // Attach the security group
    });

    // Create an SQS Queue
    const queue = new sqs.Queue(this, 'test-sqs-queue');

    // Create an SNS Topic
    const snsTopic = new sns.Topic(this, 'test-sns-topic');


    // Create a Lambda function for posting messages to SQS
    const postsLambda = new lambda.Function(this, 'PostsLambda', {
    runtime: lambda.Runtime.NODEJS_18_X,
    handler: 'Posts.lambdaHandler',
    code: lambda.Code.fromAsset('lambdas'),
    environment: {
        QUEUE_URL: queue.queueUrl,
        DB_HOST: dbInstance.dbInstanceEndpointAddress,
        DB_PORT: dbInstance.dbInstanceEndpointPort.toString(),
        DB_USER: 'postgres',
        DB_PASSWORD: 'password',
    },
    });

    // Grant Lambda permissions to read from the RDS instance and send messages to SQS
    dbInstance.grantConnect(postsLambda);
    queue.grantSendMessages(postsLambda);

    // Create a Lambda function for sending emails
    const sendEmailLambda = new lambda.Function(this, 'SendEmailLambda', {
    runtime: lambda.Runtime.NODEJS_18_X,
    handler: 'SendEmail.lambdaHandler',
    code: lambda.Code.fromAsset('lambdas'),
    });

    // Subscribe the SNS Topic to Send Email Lambda
    snsTopic.addSubscription(new snsSubscriptions.LambdaSubscription(sendEmailLambda));

    // Create an event rule to trigger the PostsLambda on a cron schedule (e.g., every morning)
    const rule = new events.Rule(this, 'PostsRule', {
        schedule: events.Schedule.cron({ minute: '0', hour: '8' }), // Adjust the schedule as needed
    });

    rule.addTarget(new targets.LambdaFunction(postsLambda));

    // Create an SQS event source for SendEmailLambda to process messages from the queue
    const eventSource = new lambdaEventSources.SqsEventSource(queue, { batchSize: 1 } );
    sendEmailLambda.addEventSource(eventSource);
  }
}
