import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const REGION = "us-east-2"; 

export const DynamoClient = DynamoDBDocument.from(new DynamoDB({ region: REGION }));