import { createHttpResponse, HttpStatus } from "../../../utils/httpResponseUtils";
import { SessionService } from "../../../services/SessionService";
import { handleError } from "../../../utils/errorHandlingUtils";
import { validator } from "./validator";

export default function makeController(
  sessionService: SessionService = new SessionService()
) {
  const controller = async ({
    userId,
    courseId,
    sessionId,
  }: {
    userId: string;
    courseId: string;
    sessionId: string;
  }) => {
    try {
      validator({ userId, courseId, sessionId });

      const session = await sessionService.getSession({
        userId,
        courseId,
        sessionId,
      });      

      return createHttpResponse({
        statusCode: HttpStatus.OK,
        message: "Session retrieved successfully",
        data: session,
      });
    } catch (error: any) {
      return handleError(error);
    }
  };

  return controller;
}
