import { Session } from "../../../types/Session";

export type CreateSessionRequest = {
  headers: { "x-user-id": string };
  pathParameters: {
    courseId: string;
  };
  body: Pick<
    Session,
    "sessionId" | "averageScore" | "timeStudied" | "totalModulesStudied"
  >;
};
