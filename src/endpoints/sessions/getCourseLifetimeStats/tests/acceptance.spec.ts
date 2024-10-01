import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { AggregatedLifetimeSessions, Session } from "../../../../types/Session";
import { SessionService } from "../../../../services/SessionService";

describe("getCourseLifetimeStats", () => {
  let session1Valid: Session;
  let session2Valid: Session;
  let session3Valid: Session;
  let sessionInvalidUserId: Session;
  let sessionInvalidCourseId: Session;
  let sessions: Session[];
  let userId: string;
  let courseId: string;

  const sessionService = new SessionService();
  beforeEach(() => {
    userId = uuidv4();
    courseId = uuidv4();
    session1Valid = {
      sessionId: uuidv4(),
      courseId: courseId,
      userId: userId,
      averageScore: 100,
      timeStudied: 30000,
      totalModulesStudied: 2,
    };

    session2Valid = {
      sessionId: uuidv4(),
      courseId: courseId,
      userId: userId,
      averageScore: 75,
      timeStudied: 30000,
      totalModulesStudied: 2,
    };

    session3Valid = {
      sessionId: uuidv4(),
      courseId: courseId,
      userId: userId,
      averageScore: 50,
      timeStudied: 30000,
      totalModulesStudied: 2,
    };

    sessionInvalidUserId = {
      sessionId: uuidv4(),
      courseId: courseId,
      userId: uuidv4(),
      averageScore: 40,
      timeStudied: 30001,
      totalModulesStudied: 2,
    };

    sessionInvalidCourseId = {
      sessionId: uuidv4(),
      courseId: uuidv4(),
      userId: userId,
      averageScore: 40,
      timeStudied: 30001,
      totalModulesStudied: 2,
    };

    sessions = [
      session1Valid,
      session2Valid,
      session3Valid,
      sessionInvalidUserId,
      sessionInvalidCourseId,
    ];
  });

  afterEach(async () => {
    await Promise.all(
      sessions.map((session) => {
        sessionService.deleteSession({
          courseId: session.courseId,
          sessionId: session.sessionId,
          userId: session.userId,
        });
      })
    );
  });

  describe("controller", () => {
    it("should hit endpoint and return lifetime stats", async () => {
      //Given
      await Promise.all(
        sessions.map((session) => {
          sessionService.createSession(session);
        })
      );

      const expected: AggregatedLifetimeSessions = {
        averageScore: 75,
        timeStudied: 90000,
        totalModulesStudied: 6
      }

      //When
      const response = await axios.get(
        `http://localhost:3000/courses/${courseId}`,
        {
          headers: { "x-user-id": userId },
        }
      );

      //Then
      expect(response.data.data).toStrictEqual(expected);
    });
  });
});
