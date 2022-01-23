const getUsers = require("./nisroom/getUsers");
const getUser = require("./nisroom/getUser");
const patchUser = require("./nisroom/patchUser");
const getLogs = require("./nislog/getLogs");

exports.handler = async (event, context, callback) => {
  event.path = decodeURI(event.path).split("/").filter(Boolean); // パス内に日本語が存在する可能性があるのでデコード後，パスをパースし，空文字を削除して整形
  event.body = JSON.parse(event.body);

  if (event.path[0] === "users") {
    switch (event.path.length) {
      case 1: {
        if (event.httpMethod === "GET") {
          await getUsers(callback);
        }
        break;
      }
      case 2: {
        if (event.httpMethod === "GET") {
          await getUser(event, callback);
        } else if (event.httpMethod === "PATCH") {
          await patchUser(event, callback);
        }
        break;
      }
    }
  } else if (event.path[0] === "logs") {
    switch (event.path.length) {
      case 1: {
        if (event.httpMethod === "GET") {
          await getLogs(callback);
        }
        break;
      }
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: "Invalid API requested." }),
  };
};
