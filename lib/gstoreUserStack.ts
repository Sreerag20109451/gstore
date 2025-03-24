import * as cdk from "aws-cdk-lib";
import { UserPool, UserPoolIdentityProviderGoogle } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class GstoreUserStack extends cdk.Stack {
  public readonly userPool: UserPool;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const googleAuth = new UserPoolIdentityProviderGoogle(this,"googleIdentity", {
        
    })

    this.userPool = new UserPool(this, "gstore-userpool", {

        autoVerify : {
            email : true
        },
        signInAliases : {
            email :true,
            username : true
        },
        passwordPolicy: {
            minLength :8 ,
            requireDigits : true,
            requireLowercase : true,
            requireSymbols: true
        },
        userPoolName : "GstoreUserPool",
        
    })


    this.userPool.addClient("appClient" ,{
    authFlows :{
        adminUserPassword : true,
        user: true,
        userSrp :true,
        userPassword: true
    },
    authSessionValidity: cdk.Duration.minutes(12),
    idTokenValidity : cdk.Duration.days(1),
    })
  }
}


//242400249942-va4jc13ajfdv3ainihrl74hp0jjl5gd1.apps.googleusercontent.com
//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