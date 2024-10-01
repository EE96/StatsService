import { APIGatewayProxyHandler } from "aws-lambda";

import { SessionService } from "../../../services/SessionService";
import { CreateSessionRequest } from "./types";
import makeController from "./controller";

export const handler: APIGatewayProxyHandler = async (event) => {
  const sessionService = new SessionService();
  const request = {
    headers: event.headers,
    pathParameters: event.pathParameters,
    body: JSON.parse(event.body || "{}"),
  } as CreateSessionRequest;
  
  const userId = request.headers["x-user-id"];
  const courseId = request.pathParameters.courseId;
  const { sessionId, totalModulesStudied, averageScore, timeStudied } =
    request.body;

  const session = {
    userId,
    courseId,
    sessionId,
    totalModulesStudied,
    averageScore,
    timeStudied,
  };

  const controller = makeController(sessionService);

  return controller(session)
  
};
