import { v4 as uuidv4 } from "uuid";

import { HttpStatus } from "../../../../utils/httpResponseUtils";
import { Session } from "../../../../types/Session";
import makeController from "../controller";

describe("getCourseLifetimeStats", () => {
  let controller: ReturnType<typeof makeController>;
  let sessionServiceMock: any;
  let session: Session;
  beforeEach(() => {
    sessionServiceMock = {
      getCourseLifetimeStats: jest.fn(),
    };

    session = {
      sessionId: uuidv4(),
      courseId: uuidv4(),
      userId: uuidv4(),
      averageScore: 40,
      timeStudied: 30000,
      totalModulesStudied: 2,
    };

    controller = makeController(sessionServiceMock);
  });

  describe("controller", () => {
    it("should successfully get session", async () => {
      //Given
      sessionServiceMock.getCourseLifetimeStats.mockReturnValue(session);

      //When
      const returnedResponse = await controller(session);

      //Then
      expect(returnedResponse.statusCode).toStrictEqual(HttpStatus.OK);
      expect(JSON.parse(returnedResponse.body).data).toStrictEqual(session);
    });

    it("should throw with validation error - userId", async () => {
      //Given
      session.userId = "bleebloo";
      //When
      const returnedResponse = await controller(session);

      //Then
      expect(returnedResponse.statusCode).toStrictEqual(HttpStatus.BAD_REQUEST);
      expect(JSON.parse(returnedResponse.body).reason).toStrictEqual(
        "Request requires valid userId in headers"
      );
    });

    it("should throw with validation error - courseId", async () => {
      //Given
      session.courseId = "bleebloo";
      //When
      const returnedResponse = await controller(session);

      //Then
      expect(returnedResponse.statusCode).toStrictEqual(HttpStatus.BAD_REQUEST);
      expect(JSON.parse(returnedResponse.body).reason).toStrictEqual(
        "Request requires valid courseId in path parameters"
      );
    });
  });
});
