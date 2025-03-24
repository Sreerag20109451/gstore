import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as dotenv from "dotenv"


dotenv.config()


const stagename = process.env.STAGE || "dev"
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class GstoreAuthStack extends cdk.Stack {


  public readonly UserTable: Table
  public readonly SubCategoryTable : Table
  public readonly CategoryTable : Table
  public readonly ProductTable : Table
  public readonly OrderTable :  Table
  public readonly OrderHistoryTable : Table
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {


    super(scope, id, props);
   //API

    const authApi = new RestApi(this, "authApis" , {
        deployOptions : {
            stageName : stagename,
        },
        retainDeployments : true,
    })



    // LamdaEndPoints 

    const signupLambda  = new NodejsFunction(this, "signup", {
        architecture : Architecture.ARM_64,
        runtime : Runtime.NODEJS_LATEST,
        timeout : cdk.Duration.seconds(10),
         entry : `${__dirname}/../auth-lambdas.ts/signup.ts`
    })
    const authEndpoint = authApi.root.addResource("auth")
    const signup = authEndpoint.addMethod("POST", new LambdaIntegration(signupLambda))
    
  }
}
