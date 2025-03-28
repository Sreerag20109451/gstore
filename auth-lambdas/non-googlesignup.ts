import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { NormalSignUpBody, PhoneSignup } from "../types";
import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import * as bcrypt from "bcrypt"

const idpClient = new CognitoIdentityClient();

export const handler =  async (event: APIGatewayProxyEventV2) => {
  const body: NormalSignUpBody | PhoneSignup | null = event.body
    ? JSON.parse(event.body)
    : null;
  if (!body)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request body" }),
    };

  try {
    if ("email" in body) {

      const hashedPwd =  await bcrypt.hash(body.password, 14)

      const signUpParams = new SignUpCommand({
        ClientId: process.env.COGNITO_CLIENT,
        Username: body.email,
        Password: hashedPwd,
        UserAttributes: [
          {
            Name: "email",
            Value: body.email,
          },
        ],
      });

    

      


    }
  } catch (err) {}
};
