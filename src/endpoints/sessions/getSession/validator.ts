import { validate } from "uuid";

import { emitError } from "../../../utils/errorHandlingUtils";
import { HttpStatus } from "../../../utils/httpResponseUtils";

export const validator = ({
  userId,
  courseId,
  sessionId,
}: {
  userId: string;
  courseId: string;
  sessionId: string;
}) => {
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
    emitError("Request requires valid sessionId in path parameters", HttpStatus.BAD_REQUEST);
  }
};
