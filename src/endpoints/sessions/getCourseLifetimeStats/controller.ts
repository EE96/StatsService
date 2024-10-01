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
  }: {
    userId: string;
    courseId: string;
  }) => {
    try {
      validator({ userId, courseId });

      const courseLifetimeStats = await sessionService.getCourseLifetimeStats({
        userId,
        courseId,
      });

      return createHttpResponse({
        statusCode: HttpStatus.OK,
        message: "Course lifetime stats retrieved successfully",
        data: courseLifetimeStats,
      });
    } catch (error: any) {
      return handleError(error);
    }
  };

  return controller;
}
