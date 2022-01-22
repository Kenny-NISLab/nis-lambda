const getUsers = require("./nisroom/getUsers");
const getUser = require("./nisroom/getUser");
// const patchUser = require("./nisroom/patchUser");

exports.handler = async (event, context, callback) => {
  event.path = decodeURI(event.path).split("/").filter(Boolean); // パス内に日本語が存在する可能性があるのでデコード後，パスをパースし，空文字を削除して整形
  console.log("event:", event); ////////////////////////////////////////////////////////

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
          console.log(event.body);
          // await patchUser(event, callback);
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
