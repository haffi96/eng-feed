import { Duration } from "aws-cdk-lib";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import * as path from "path"
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export class GenericLambda extends NodejsFunction {
    constructor(scope: Construct, fileName: string) {
        super(scope, fileName, {
            architecture: Architecture.ARM_64,
            runtime: Runtime.NODEJS_18_X,
            entry: path.join(__dirname,`../backend/lambda/${fileName}.ts`),
            logRetention: RetentionDays.ONE_DAY,
            timeout: Duration.seconds(10),
            environment: {
                TEST_SECRET: "foo",
                DATABASE_URL: process.env.DATABASE_URL as string,
            }
        })
    }
}