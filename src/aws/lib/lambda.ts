import { Duration } from "aws-cdk-lib"
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { RetentionDays } from "aws-cdk-lib/aws-logs"
import { Construct } from "constructs"
import { config as dotenvConfig } from "dotenv"
import { join as pathJoin, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = dirname(__filename) // get the name of the directory

dotenvConfig()

const db_url =
  process.env.ENV === "prod"
    ? process.env.PROD_DATABASE_URL
    : process.env.DEV_DATABASE_URL

export class GenericLambda extends NodejsFunction {
  constructor(scope: Construct, fileName: string) {
    super(scope, fileName, {
      architecture: Architecture.ARM_64,
      runtime: Runtime.NODEJS_18_X,
      entry: pathJoin(__dirname, `../backend/lambda/${fileName}.ts`),
      logRetention: RetentionDays.ONE_DAY,
      timeout: Duration.seconds(30),
      environment: {
        DATABASE_URL: db_url as string,
        ENV: process.env.ENV as string,
        SQS_QUEUE_URL: process.env.SQS_QUEUE_URL as string,
        RESEND_API_KEY: process.env.RESEND_API_KEY as string,
      },
    })
  }
}
