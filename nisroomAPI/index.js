const getUsers = require("./nisroom/getUsers");
const getUser = require("./nisroom/getUser");

exports.handler = async (event, context, callback) => {
  console.log("event:", event);

  if (event.httpMethod === "GET" && event.path === "/users") {
    getUsers(callback);
  } else if (event.httpMethod === "GET") {
    getUser(event, callback);
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Invalid API requested." }),
    };
  }
};
