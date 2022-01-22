const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "dynamodb.ap-northeast-1.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function () {
  const params = {
    TableName: "Students",
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

  docClient.scan(params, (err, data) => {
    if (err) {
      console.error(err);
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
    TableName: "Students",
    Key: {
      name: student.name,
    },
    UpdateExpression: "set isStay = :i",
    ExpressionAttributeValues: {
      ":i": false,
    },
    ReturnValues: "NONE",
  };

  docClient.update(params, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
