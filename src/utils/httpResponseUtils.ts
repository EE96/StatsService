export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export type HttpCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

export const HttpStatusMap = {
  200: "Ok",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorised",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

export const createHttpResponse = ({
  statusCode,
  message,
  reason,
  data,
}: {
  statusCode: HttpStatus;
  message: string;
  reason?: string;
  data?: any;
}) => {
  return {
    statusCode,
    body: JSON.stringify({
      reason,
      message,
      data,
    }),
  };
};
