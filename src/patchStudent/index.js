const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
});

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);
  //const body = event.body;

  let params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: parseInt(event.pathParameters.id, 10),
    },
    UpdateExpression: "",
    ExpressionAttributeValues: {},
    ReturnValues: "UPDATED_NEW",
  };

  let response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: "No Response Body.",
  };

  if (body.is_stay != null && body.schedule) {
    params.UpdateExpression = "set is_stay = :i, schedule = :s";
    if (!body.schedule.length) {
      params.ExpressionAttributeValues = {
        ":i": body.is_stay,
        ":s": null,
      };
    } else {
      params.ExpressionAttributeValues = {
        ":i": body.is_stay,
        ":s": dynamoDB.createSet(body.schedule),
      };
    }
  } else if (body.is_stay != null) {
    params.UpdateExpression = "set is_stay = :i";
    params.ExpressionAttributeValues = {
      ":i": body.is_stay,
    };
  } else if (body.schedule) {
    params.UpdateExpression = "set schedule = :s";
    if (!body.schedule.length) {
      params.ExpressionAttributeValues = {
        ":s": null,
      };
    } else {
      params.ExpressionAttributeValues = {
        ":s": dynamoDB.createSet(body.schedule),
      };
    }
  } else {
    callback(null, response);
  }

  if (body.is_stay != null || body.schedule) {
    dynamoDB.update(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        response.body = JSON.stringify(data);
        callback(null, response);
      }
    });
  }
};
