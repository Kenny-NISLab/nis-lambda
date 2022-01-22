// const Consistant = require("./consistant");
const getUsers = require("./api/getUsers");

exports.handler = async (event, context, callback) => {
  console.log("event:", event);
  if (event.httpMethod === "GET" && event.path === "/users") {
    getUsers(callback);
  } else {
    const response = {
      statusCode: 200,
      body: JSON.stringify("Hello from Lambda!"),
    };
    return response;
  }
};

// this.handler();
