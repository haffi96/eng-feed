#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DeployTestStack } from '../lib/deploy-stack';

const app = new cdk.App();

new DeployTestStack(app, 'test-stack', {
    env: {
      region: 'eu-west-2',
      account: '243139780683',
    },
});
