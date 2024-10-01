import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { SessionService } from "../../../../services/SessionService";
import { Session } from "../../../../types/Session";

describe("getSession", () => {
  let session: Session;
  const sessionService = new SessionService();
  beforeEach(() => {
    session = {
      sessionId: uuidv4(),
      courseId: uuidv4(),
      userId: uuidv4(),
      averageScore: 40,
      timeStudied: 30000,
      totalModulesStudied: 2,
    };
  });

  afterEach(async () => {
    await sessionService.deleteSession({
      courseId: session.courseId,
      sessionId: session.sessionId,
      userId: session.userId,
    });
  });

  describe("controller", () => {
    it("should hit endpoint and return fetched session", async () => {
      //Given
      await sessionService.createSession(session);
      //When
      const returnedSession = await axios.get(
        `http://localhost:3000/courses/${session.courseId}/sessions/${session.sessionId}`,
        {
          headers: { "x-user-id": session.userId },
        }
      );

      //Then
      expect(returnedSession.data.data).toStrictEqual(session);
    });
  });
});
