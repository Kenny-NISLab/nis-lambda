const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "dynamodb.ap-northeast-1.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function () {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    ProjectionExpression: "#name",
    FilterExpression: "#archive = :archive AND #isStay = :isStay",
    ExpressionAttributeNames: {
      "#archive": "archive",
      "#isStay": "isStay",
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":isStay": true,
      ":archive": false,
    },
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else if (data.Items.length) {
      leaveAllStudents(data.Items);
    }
  });
};

function leaveAllStudents(students) {
  students.map((student) => leaveStudent(student));
}

function leaveStudent(student) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      name: student.name,
    },
    UpdateExpression: "set isStay = :i",
    ExpressionAttributeValues: {
      ":i": false,
    },
    ReturnValues: "NONE",
  };

  docClient.update(params, function (err) {
    if (err) {
      console.error(err);
    }
  });
}
