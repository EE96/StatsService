import { APIGatewayProxyHandler } from "aws-lambda";

import { SessionService } from "../../../services/SessionService";
import { GetCourseLifetimeStatsRequest } from "./types";
import makeController from "./controller";

export const handler: APIGatewayProxyHandler = async (event) => {
  const sessionService = new SessionService();

  const request = {
    headers: event.headers,
    pathParameters: event.pathParameters,
  } as GetCourseLifetimeStatsRequest;

  const userId = request.headers["x-user-id"];
  const courseId = request.pathParameters.courseId;

  const controller = makeController(sessionService);

  return controller({ userId, courseId });
};
