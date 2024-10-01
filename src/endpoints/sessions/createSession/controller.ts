import { createHttpResponse, HttpStatus } from "../../../utils/httpResponseUtils";
import { SessionService } from "../../../services/SessionService";
import { handleError } from "../../../utils/errorHandlingUtils";
import { Session } from "../../../types/Session";
import { validator } from "./validator";

export default function makeController(
  sessionService: SessionService = new SessionService()
) {
  const controller = async (session: Session) => {
    try {
      validator(session);

      const createdSession = await sessionService.createSession(session);

      return createHttpResponse({
        statusCode: HttpStatus.CREATED,
        message: "Session created successfully",
        data: createdSession,
      });
    } catch (error: any) {
      
      return handleError(error);
    }
  };

  return controller
}
