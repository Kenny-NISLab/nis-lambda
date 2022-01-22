const AWS = require("aws-sdk");
const Consistant = require("../consistant");

AWS.config.update({
  region: Consistant.aws_region,
  endpoint: Consistant.aws_dynamodb_endpoint,
});

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: Consistant.aws_dynamodb_students_tableName,
  Key: {},
  UpdateExpression: "set isStay = :i",
  ExpressionAttributeValues: {},
  ReturnValues: "NONE",
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
  if (event.body.isStay !== true && event.body.isStay !== false) {
    callback(new Error("You need request body isStay(Boolean)."));
  } else {
    params.Key.name = event.path[1];
    params.ExpressionAttributeValues[":i"] = event.body.isStay;

    docClient.update(params, (err, data) => {
      if (err) {
        console.error(err);
        callback(new Error(err));
      } else {
        response.body = JSON.stringify(data);
      }
    });
  }

  await callback(null, response);
};
