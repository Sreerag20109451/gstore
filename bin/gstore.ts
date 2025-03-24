#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { GstoreDBStack } from '../lib/gstoreDBtack';
import { GstoreUserStack } from '../lib/gstoreUserStack';

const app = new cdk.App();


const envType = app.node.tryGetContext('env') || 'dev'; 
const envConfig = app.node.tryGetContext(envType);


new GstoreDBStack(app, 'GstoreStack', {
});

new GstoreUserStack(app, "UserStack", {})