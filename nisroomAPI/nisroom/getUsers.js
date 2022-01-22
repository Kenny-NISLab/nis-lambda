const AWS = require("aws-sdk");
const Consistant = require("../consistant");

AWS.config.update({
  region: Consistant.aws_region,
  endpoint: Consistant.aws_dynamodb_endpoint,
});

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: Consistant.aws_dynamodb_students_tableName,
  ProjectionExpression: "#name, studentId, avatarImage, isStay, #archive",
  FilterExpression: "#archive = :archive",
  ExpressionAttributeNames: {
    "#archive": "archive",
    "#name": "name",
  },
  ExpressionAttributeValues: {
    ":archive": false,
  },
};

const response = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  },
  body: {},
};

module.exports = async function (callback) {
  docClient.scan(params, (err, data) => {
    if (err) {
      console.error(err);
      callback(new Error(err));
    } else if (data.Items.length) {
      response.body = JSON.stringify(data.Items.sort((a, b) => a.studentId - b.studentId));
    } else {
      response.statusCode = 404;
      response.body = JSON.stringify({ message: "Item not found." });
    }
  });

  await callback(null, response);
};
