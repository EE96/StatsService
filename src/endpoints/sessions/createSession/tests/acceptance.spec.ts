import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { SessionService } from "../../../../services/SessionService";
import { Session } from "../../../../types/Session";

describe("createSession", () => {
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
    it("should hit endpoint and return created session", async () => {
      //Given
      const { courseId, userId, ...body } = session;
      //When
      const response = await axios.post(
        `http://localhost:3000/courses/${courseId}`,
        body,
        {
          headers: { "x-user-id": userId },
        }
      );
      const storedSession = await sessionService.getSession({
        courseId,
        sessionId: session.sessionId,
        userId,
      });

      //   Then
      expect(response.data.data).toStrictEqual(session);
      expect(storedSession).toStrictEqual(session);
    });
  });
});
