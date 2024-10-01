import { APIGatewayProxyHandler } from "aws-lambda";

import { SessionService } from "../../../services/SessionService";
import { GetSessionRequest } from "./types";
import makeController from "./controller";

export const handler: APIGatewayProxyHandler = async (event) => {
  const sessionService = new SessionService();

  const request = {
    headers: event.headers,
    pathParameters: event.pathParameters,
  } as GetSessionRequest;

  const userId = request.headers["x-user-id"];
  const { courseId, sessionId } = request.pathParameters;

  const controller = makeController(sessionService);

  return controller({ userId, courseId, sessionId });
};
