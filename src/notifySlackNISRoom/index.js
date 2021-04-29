const https = require("https");
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
});

exports.handler = () => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  dynamoDB.scan(params, function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      createText(data.Items);
    }
  });
};

function createText(students) {
  let stay_member = new Array();

  students.forEach((student) => {
    if (student.is_stay) {
      stay_member.push(student.j_last_name);
    }
  });

  let stay = stay_member.join("・");

  let date = new Date();
  date.setHours(date.getHours() + 9);

  let msg =
    "【NISLAB在室情報】\n" +
    (date.getMonth() + 1) +
    "月" +
    date.getDate() +
    "日 " +
    date.getHours() +
    "時" +
    date.getMinutes() +
    "分現在の情報です。" +
    "\n\n【在室】：" +
    stay +
    "\n\n※情報には間違いがある可能性があります。\n※このお知らせは毎日9〜18時に配信しています。\n\n" +
    "----------------------";

  let data = {
    text: msg,
  };

  const url = process.env.WEBHOOK_URL;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const req = https.request(url, options, function (res) {
    console.log("StatusCode:", res.statusCode);
  });
  req.write(JSON.stringify(data));
  req.end();
}
