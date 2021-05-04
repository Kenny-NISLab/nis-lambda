const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
});

//日付取得
const date = new Date();
date.setHours(date.getHours() + 9);
date.setDate(date.getDate() - 1);
const yesterday =
  date.getFullYear() +
  "-" +
  ("0" + (date.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + date.getDate()).slice(-2);

exports.handler = function () {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  dynamoDB.scan(params, function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      const students = data.Items;
      deleteAllPastDate(students);
    }
  });
};

function deleteAllPastDate(students) {
  students.forEach((student) => {
    deletePastDate(student);
  });
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
          ":s": dynamoDB.createSet(student.schedule.values),
        };
      }

      dynamoDB.update(params, function (err) {
        if (err) {
          console.log("Error:", err);
        }
      });
    }
  }
}
