const https = require("https");
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
});
const NISROOM_URL = "https://room.nislab.io";

/**
 * 日付処理
 */
const date = new Date();
date.setHours(date.getHours() + 9);
const timeFmt = date.getHours() + "時" + date.getMinutes() + "分";
const dateFmt = date.getMonth() + 1 + "月" + date.getDate() + "日 " + date.getHours() + "時" + date.getMinutes() + "分";

/**
 * Slackに通知するためのオプション
 */
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * ハンドラー関数
 */
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

/**
 * Slack に送信
 * @param {Array} students
 */
async function createText(students) {
  students.sort(function (a, b) {
    return a.id - b.id
  });

  let stay_member = new Array();
  students.forEach((student) => {
    if (student.is_stay) {
      stay_member.push(student.j_last_name);
    }
  });

  let data = {};
  if (stay_member.length) {
    data = await create_member_message(stay_member);
  } else {
    // data = await create_nomember_message();
  }

  const req = https.request(WEBHOOK_URL, options, function (res) {
    console.log("StatusCode:", res.statusCode);
  });
  req.write(JSON.stringify(data));
  req.end();
}

/**
 * 在籍している人がいない場合に Slack に送信するメッセージを作成
 * @returns {Object} - Slack に送信するペイロード
 */
async function create_nomember_message() {
  return {
    text: "[" + timeFmt + "] 現在、研究室には誰もいないようです。",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: dateFmt + " 現在、研究室には誰もいないようです。",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*<" + NISROOM_URL + "|NISROOM>*",
        },
      },
      {
        type: "divider",
      },
    ],
  };
}

/**
 * 在籍している人がいる場合に Slack に送信するメッセージを作成
 * @param {Array} stay_member
 * @returns {Object} - Slack に送信するペイロード
 */
async function create_member_message(stay_member) {
  let stay_member_txt = stay_member.join("・");
  return {
    text: "[" + timeFmt + "] " + stay_member.length + "人（" + stay_member_txt + "）が研究室にいるようです。",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: dateFmt + " 現在、" + stay_member.length + "人が研究室にいるようです。",
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
