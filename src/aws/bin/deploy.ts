#!/usr/bin/env node
import * as cdk from "aws-cdk-lib"
import { DevFeedStack } from "../lib/stack"
import { Stage } from "aws-cdk-lib"

const app = new cdk.App()

const prodStage = new Stage(app, "prod-env", {
    env: {
        region: "eu-west-2",
        account: "243139780683",
    }
})

const testStage = new Stage(app, "test-env", {
    env: {
        region: "eu-west-2",
        account: "243139780683",
    }
})

new DevFeedStack(prodStage, "dev-feed-stack")

new DevFeedStack(testStage, "dev-feed-stack")