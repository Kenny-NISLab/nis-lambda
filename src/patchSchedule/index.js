const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
});

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);
  if (!body.schedule.length) {
    body.schedule.push("");
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: parseInt(event.pathParameters.id, 10),
    },
    UpdateExpression: "set schedule = :k",
    ExpressionAttributeValues: {
      ":k": dynamoDB.createSet(body.schedule),
    },
    ReturnValues: "UPDATED_NEW",
  };

  dynamoDB.update(params, function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      // if (data.Attributes.schedule.values[0] == "") {
      //   data.Attributes.schedule.values.pop();
      // }

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
