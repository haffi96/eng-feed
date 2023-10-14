#!/usr/bin/env node
import * as cdk from "aws-cdk-lib"
import { TestStack } from "../lib/stack"

const app = new cdk.App()

new TestStack(app, "test-stack", {
    env: {
        region: "eu-west-2",
        account: "243139780683",
    },
})
