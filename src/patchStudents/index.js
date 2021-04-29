const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
});

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: parseInt(event.pathParameters.id, 10),
    },
    UpdateExpression: "set is_stay = :v",
    ExpressionAttributeValues: {
      ":v": body.is_stay,
    },
    ReturnValues: "UPDATED_NEW",
  };

  dynamoDB.update(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify(data),
      };
      callback(null, response);
    }
  });
};
