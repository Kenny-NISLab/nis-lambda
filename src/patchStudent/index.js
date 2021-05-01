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
    body: "No Change.",
  };

  if (body.is_stay && body.schedule) {
    if (!body.schedule.length) {
      body.schedule.push("");
    }
    params.UpdateExpression = "set is_stay = :i, schedule = :s";
    params.ExpressionAttributeValues = {
      ":i": body.is_stay,
      ":s": dynamoDB.createSet(body.schedule),
    };
  } else if (body.is_stay) {
    params.UpdateExpression = "set is_stay = :i";
    params.ExpressionAttributeValues = {
      ":i": body.is_stay,
    };
  } else if (body.schedule) {
    if (!body.schedule.length) {
      body.schedule.push("");
    }
    params.UpdateExpression = "set schedule = :s";
    params.ExpressionAttributeValues = {
      ":s": dynamoDB.createSet(body.schedule),
    };
  } else {
    callback(null, response);
  }

  if (body.is_stay || body.schedule) {
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
