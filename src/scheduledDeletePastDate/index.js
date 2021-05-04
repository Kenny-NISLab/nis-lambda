const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
});

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
  //日付取得
  let date = new Date();
  date.setHours(date.getHours() + 9);
  date.setDate(date.getDate() - 1);
  let yesterday =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);

  if (student.schedule) {
    if (student.schedule.values.indexOf(yesterday) !== -1) {
      student.schedule.values.splice(
        student.schedule.values.indexOf(yesterday),
        1
      );

      let params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          id: student.id,
        },
        UpdateExpression: "set schedule = :s",
        //ExpressionAttributeValues: {},
        ReturnValues: "UPDATED_NEW",
      };

      if (!student.schedule.values.length) {
        student.schedule.values = null;
        params.ExpressionAttributeValues = { ":s": null };
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
