const events = require("./events.data");
const path = require("path");
const AWS = require("aws-sdk-mock");
AWS.setSDK(path.resolve("node_modules/aws-sdk"));
const sinon = require("sinon");

describe("PatchStudent Test", () => {
  const stayIsTrueAndScheduleHasDate = {
    is_stay: true,
    schedule: "2021-05-08",
  };
  const stayIsTrueAndScheduleIsNull = {
    is_stay: true,
    schedule: null,
  };
  const stayIsTrue = {
    is_stay: true,
  };
  const stayIsFalseAndScheduleHasDate = {
    is_stay: false,
    schedule: "2021-05-08",
  };
  const stayIsFalseAndScheduleIsNull = {
    is_stay: false,
    schedule: null,
  };
  const stayIsFalse = {
    is_stay: false,
  };
  const ScheduleHasDate = {
    schedule: "2021-05-08",
  };
  const ScheduleIsNull = {
    schedule: null,
  };
  const noResponseBody = "No Response Body.";

  test.each`
    event                                    | expectedCreateSetCalled | updateReturns                    | expectedStatusCode | expectedBody
    ${events.stayIsTrueAndScheduleHasDate}   | ${true}                 | ${stayIsTrueAndScheduleHasDate}  | ${200}             | ${JSON.stringify(stayIsTrueAndScheduleHasDate)}
    ${events.stayIsTrueAndScheduleHasEmpty}  | ${false}                | ${stayIsTrueAndScheduleIsNull}   | ${200}             | ${JSON.stringify(stayIsTrueAndScheduleIsNull)}
    ${events.stayIsTrueAndScheduleIsNull}    | ${false}                | ${stayIsTrue}                    | ${200}             | ${JSON.stringify(stayIsTrue)}
    ${events.stayIsFalseAndScheduleHasDate}  | ${true}                 | ${stayIsFalseAndScheduleHasDate} | ${200}             | ${JSON.stringify(stayIsFalseAndScheduleHasDate)}
    ${events.stayIsFalseAndScheduleHasEmpty} | ${false}                | ${stayIsFalseAndScheduleIsNull}  | ${200}             | ${JSON.stringify(stayIsFalseAndScheduleIsNull)}
    ${events.stayIsFalseAndScheduleIsNull}   | ${false}                | ${stayIsFalse}                   | ${200}             | ${JSON.stringify(stayIsFalse)}
    ${events.stayIsNullAndScheduleHasDate}   | ${true}                 | ${ScheduleHasDate}               | ${200}             | ${JSON.stringify(ScheduleHasDate)}
    ${events.stayIsNullAndScheduleHasEmpty}  | ${false}                | ${ScheduleIsNull}                | ${200}             | ${JSON.stringify(ScheduleIsNull)}
    ${events.stayIsNullAndScheduleIsNull}    | ${false}                | ${null}                          | ${200}             | ${noResponseBody}
  `(
    "Should return $expectedStatusCode when event.body is $event.body",
    ({
      event,
      expectedCreateSetCalled,
      updateReturns,
      expectedStatusCode,
      expectedBody,
    }) => {
      let createSetSpy = sinon.spy();
      AWS.mock("DynamoDB.DocumentClient", "createSet", createSetSpy);
      AWS.mock(
        "DynamoDB.DocumentClient",
        "update",
        function (params, callback) {
          // callback(null, {
          //   body: updateReturns,
          // });
          callback(null, updateReturns);
        }
      );
      const lambda = require("../src/patchStudent/index");
      function callback(err, data) {
        // console.log(data);
        expect(data.statusCode).toBe(expectedStatusCode);
        expect(data.body).toBe(expectedBody);
      }
      lambda.handler(event, {}, callback);
      expect(createSetSpy.calledOnce).toBe(expectedCreateSetCalled);

      AWS.restore("DynamoDB.DocumentClient", "update");
      AWS.restore("DynamoDB.DocumentClient", "createSet");
    }
  );
});
