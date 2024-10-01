import SessionRepository from "../repositories/SessionRepository";
import {
  AggregatedLifetimeSessions,
  Session,
  SessionKey,
} from "../types/Session";

export class SessionService {
  constructor(public repository: SessionRepository = new SessionRepository()) {}

  async createSession(session: Session): Promise<Session> {
    const newSession = await this.repository.insertSession(session);

    return newSession;
  }

  async getSession({
    courseId,
    sessionId,
    userId,
  }: SessionKey): Promise<Session> {
    const session = await this.repository.getSession({
      courseId,
      sessionId,
      userId,
    });

    if (!session) throw new Error("Failed to retrieve study session");

    return session;
  }

  async getCourseLifetimeStats({
    courseId,
    userId,
  }: Omit<SessionKey, "sessionId">): Promise<AggregatedLifetimeSessions> {
    const courseStats = await this.repository.fetchUserCourseSessions({
      courseId,
      userId,
    });

    const aggregatedLifetimeSessions: AggregatedLifetimeSessions = {
      totalModulesStudied: 0,
      averageScore: 0,
      timeStudied: 0,
    };

    courseStats.forEach((session) => {
      aggregatedLifetimeSessions.totalModulesStudied +=
        session.totalModulesStudied;
      aggregatedLifetimeSessions.averageScore += session.averageScore;
      aggregatedLifetimeSessions.timeStudied += session.timeStudied;
    });

    aggregatedLifetimeSessions.averageScore =
      aggregatedLifetimeSessions.averageScore / courseStats.length;

    return aggregatedLifetimeSessions;
  }

  async deleteSession(key: SessionKey) {
    await this.repository.deleteSession(key);
  }
}
