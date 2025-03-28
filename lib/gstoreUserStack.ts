import * as cdk from "aws-cdk-lib";
import {
  CfnUserPoolGroup,
  ProviderAttribute,
  UserPool,
  UserPoolClientIdentityProvider,
  UserPoolIdentityProviderGoogle,
} from "aws-cdk-lib/aws-cognito";
import { CfnUserGroup } from "aws-cdk-lib/aws-elasticache";
import { Construct } from "constructs";
import * as dotenv from "dotenv";

dotenv.config();

export class GstoreUserStack extends cdk.Stack {
  public readonly userPool: UserPool;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.userPool = new UserPool(this, "gstoreUserpool", {
      autoVerify: {
        email: true,
        phone: true
      },
      signInAliases: {
        email: true,
        phone : true
      },
      passwordPolicy: {
        minLength: 8,
        requireDigits: true,
        requireLowercase: true,
        requireSymbols: true,
      },
      userPoolName: "GstoreUserPool",
      removalPolicy: cdk.RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
    });

    const googleAuth = new UserPoolIdentityProviderGoogle(
      this,
      "googleIdentity",
      {
        userPool: this.userPool,
        clientId: process.env.GOOGLE_CLIENT!!,
        clientSecret: process.env.GOOGLE_SECRET!!,
        scopes: ["email"],
        attributeMapping: {
          email: ProviderAttribute.GOOGLE_EMAIL,
        },
      }
    );

    const webClient = this.userPool.addClient("appClient", {
      authFlows: {
        adminUserPassword: true,
        user: true,
        userSrp: true,
        userPassword: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        callbackUrls: ["https://google.com"],
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.GOOGLE],
      authSessionValidity: cdk.Duration.minutes(12),
      idTokenValidity: cdk.Duration.days(1),
    });

    webClient.node.addDependency(googleAuth);
    const admingrp = new CfnUserPoolGroup(this, "admingrp", {
      userPoolId: this.userPool.userPoolId,
      groupName: "admin_grp",
    });
    const customer_group = new CfnUserPoolGroup(this, "customergrp", {
      userPoolId: this.userPool.userPoolId,
      groupName: "customergrp",
    });
  }
}
