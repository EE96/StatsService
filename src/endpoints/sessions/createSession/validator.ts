import { validate } from "uuid";

import { emitError } from "../../../utils/errorHandlingUtils";
import { HttpStatus } from "../../../utils/httpResponseUtils";
import { Session } from "../../../types/Session";

export const validator = ({
  userId,
  courseId,
  sessionId,
  totalModulesStudied,
  averageScore,
  timeStudied,
}: Session) => {
  if (!userId || !validate(userId)) {
    emitError(
      "Request requires valid userId in headers",
      HttpStatus.BAD_REQUEST
    );
  }
  if (!courseId || !validate(courseId)) {
    emitError(
      "Request requires valid courseId in path parameters",
      HttpStatus.BAD_REQUEST
    );
  }
  if (!sessionId || !validate(sessionId)) {
    emitError("Request body requires valid sessionId", HttpStatus.BAD_REQUEST);
  }

  if (
    !totalModulesStudied ||
    typeof totalModulesStudied !== "number" ||
    !averageScore ||
    typeof averageScore !== "number" ||
    !timeStudied ||
    typeof timeStudied !== "number"
  ) {
    emitError(
      "Request body is missing required fields",
      HttpStatus.BAD_REQUEST
    );
  }
};
