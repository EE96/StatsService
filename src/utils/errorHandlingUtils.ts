import {
  createHttpResponse,
  HttpCode,
  HttpStatus,
  HttpStatusMap,
} from "./httpResponseUtils";

export const handleError = (error: Error) => {
  try {
    const { reason, errorCode }: { reason: string; errorCode: HttpCode } =
      JSON.parse(error.message);

    return createHttpResponse({
      statusCode: errorCode,
      reason,
      message: HttpStatusMap[errorCode],
    });
  } catch {
    return createHttpResponse({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      reason: "Unknown Server Error",
      message: HttpStatusMap[HttpStatus.INTERNAL_SERVER_ERROR],
    });
  }
};

export const emitError = (reason: string, errorCode: HttpCode) => {
  throw new Error(JSON.stringify({ reason, errorCode }));
};
