const AWS = require("aws-sdk");
const axios = require("axios");
const moment = require("moment");

// require("dotenv").config();

AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "dynamodb.ap-northeast-1.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();

const NISROOM_URL = "https://room.nislab.io";

/**
 * Slackに通知するためのオプション
 */
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const params = {
  TableName: "Students",
  ProjectionExpression: "#name, studentId",
  FilterExpression: "#archive = :archive AND #isStay = :isStay",
  ExpressionAttributeNames: {
    "#archive": "archive",
    "#isStay": "isStay",
    "#name": "name",
  },
  ExpressionAttributeValues: {
    ":isStay": true,
    ":archive": false,
  },
};

/**
 * ハンドラー関数
 */
exports.handler = () => {
  docClient.scan(params, function (err, data) {
    if (err) {
      console.error(err);
    } else if (data.Items.length) {
      createText(data.Items);
    }
  });
};

/**
 * 在籍している人がいる場合に Slack に送信するメッセージを作成
 * @param {Array} stay_member
 * @returns {Object} - Slack に送信するペイロード
 */
async function create_member_message(stay_member) {
  const stay_member_txt = stay_member.join("・");
  return {
    text: "[" + moment().utcOffset(9).format("H:mm") + "] " + stay_member.length + "人（" + stay_member_txt + "）が研究室にいるようです。",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: moment().utcOffset(9).format("M月D日 H時mm分") + " 現在、" + stay_member.length + "人が研究室にいるようです。",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "【在室】" +
            stay_member_txt +
            "\n\n*<" +
            NISROOM_URL +
            "|NISROOM>*\n\n※ 情報には間違いがある可能性があります。\n※ このお知らせは毎日9〜19時に配信しています。",
        },
      },
      {
        type: "divider",
      },
    ],
  };
}

/**
 * Slack に送信
 * @param {Array} students
 */
async function createText(students) {
  students.sort((a, b) => a.studentId - b.studentId);

  const studentsList = new Array();
  students.map((student) => {
    studentsList.push(student.name);
  });

  config.data = await create_member_message(studentsList);

  await axios(WEBHOOK_URL, config)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
}
