import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

import { Session, SessionDbItem, SessionDbItemKey, SessionKey } from "../types/Session";
import { DynamoClient } from "./DynamoClient";

export default class SessionRepository {
  constructor(public dynamoClient: DynamoDBDocument = DynamoClient) {}

  async insertSession(session: Session) {
    const Item = this.mapToDatabase(session)
    await this.dynamoClient.put({
      TableName: "Sessions",
      Item,
    });
    
    return session;
  }

  async getSession(key: SessionKey) {
    const convertedKey = this.convertToDatabaseKey(key)
    const data = await this.dynamoClient.get({
      TableName: "Sessions",
      Key: convertedKey,
    });
    if (!data?.Item) {
      return null;
    }
    return this.mapFromDatabase(data.Item as SessionDbItem);
  }

  async deleteSession(key: SessionKey) {
    const convertedKey = this.convertToDatabaseKey(key)
    await this.dynamoClient.delete({
      TableName: "Sessions",
      Key: convertedKey,
    });
  }

  async fetchUserCourseSessions({userId, courseId}: Omit<SessionKey, 'sessionId'>) {
    const data = await this.dynamoClient.query({
      TableName: "Sessions",
      KeyConditionExpression:
        "hashKey = :hashKey and begins_with(sortKey, :courseId)",
      ExpressionAttributeValues: {
        ":hashKey": userId,
        ":courseId": courseId,
      },
    });

    if (!data?.Items) {
      return [];
    }

    return data.Items.map((item) =>
      this.mapFromDatabase(item as SessionDbItem)
    );
  }

  mapToDatabase(session: Session): SessionDbItem {
    return {
      hashKey: session.userId,
      sortKey: `${session.courseId}#${session.sessionId}`,
      totalModulesStudied: session.totalModulesStudied,
      averageScore: session.averageScore,
      timeStudied: session.timeStudied,
    };
  }

  mapFromDatabase(item: SessionDbItem): Session {
    return {
      userId: item.hashKey,
      courseId: item.sortKey.split("#")[0],
      sessionId: item.sortKey.split("#")[1],
      totalModulesStudied: item.totalModulesStudied,
      averageScore: item.averageScore,
      timeStudied: item.timeStudied,
    };
  }

  convertToDatabaseKey({
    userId,
    courseId,
    sessionId
  }: SessionKey): SessionDbItemKey {
    return {
      hashKey: userId,
      sortKey: `${courseId}#${sessionId}`
    }
  }

  convertFromDatabaseKey({
    hashKey,
    sortKey
  }: SessionDbItemKey): SessionKey {
    return {
      userId: hashKey,
      courseId: sortKey.split('#')[0],
      sessionId: sortKey.split('#')[1]
    }
  }
}
