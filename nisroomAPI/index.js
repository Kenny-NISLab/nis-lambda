const AWS = require("aws-sdk");

const Users = require("users");

AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "dynamodb.ap-northeast-1.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  console.log("event:", event);
  if (event.httpMethod === "GET" && event.pathParameters.proxy === "users") {
    Users();
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
