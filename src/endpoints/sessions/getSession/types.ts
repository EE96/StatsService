import { Session } from "../../../types/Session";

export type GetSessionRequest = {
  headers: { "x-user-id": string };
  pathParameters: {
    courseId: string;
    sessionId: string
  };
};
