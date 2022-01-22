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
  ExpressionAttributeNames: {
    "#name": "name",
  },
  Key: {},
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

module.exports = async function (event, callback) {
  params.Key.name = event.path;

  docClient.get(params, (err, data) => {
    if (err) {
      response.statusCode = 404;
      response.body = JSON.stringify(err);
      console.error(err);
    } else if (data.Item) {
      response.body = JSON.stringify(data.Item);
    } else {
      response.statusCode = 404;
      response.body = JSON.stringify({ message: "Item not found." });
    }
  });

  callback(null, response);
};
