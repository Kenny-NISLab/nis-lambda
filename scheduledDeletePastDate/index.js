const AWS = require("aws-sdk");
const moment = require("moment");

AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "dynamodb.ap-northeast-1.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();

const yesterday = moment().utcOffset(9).subtract(1, "days").format("YYYY-MM-DD");

const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

exports.handler = function () {
  docClient.scan(params, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      deleteAllPastDate(data.Items);
    }
  });
};

function deleteAllPastDate(students) {
  students.map((student) => deletePastDate(student));
}

function deletePastDate(student) {
  if (student.schedule) {
    const studentArray = student.schedule.values;
    const yesterdayIndex = studentArray.indexOf(yesterday);

    if (yesterdayIndex !== -1) {
      studentArray.splice(yesterdayIndex, 1);

      let params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          id: student.id,
        },
        UpdateExpression: "set schedule = :s",
        ReturnValues: "UPDATED_NEW",
      };

      if (!studentArray.length) {
        params.ExpressionAttributeValues = {
          ":s": null,
        };
      } else {
        params.ExpressionAttributeValues = {
          ":s": docClient.createSet(student.schedule.values),
        };
      }

      docClient.update(params, function (err) {
        if (err) {
          console.error(err);
        }
      });
    }
  }
}
