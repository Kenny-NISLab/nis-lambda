const AWS = require("aws-sdk");
const moment = require("moment");
const Converter = AWS.DynamoDB.Converter;

AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "dynamodb.ap-northeast-1.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  // 変更イベントが配列として渡される
  event.Records.map((record) => {
    if (record.eventName === "MODIFY") {
      // DynamoDB JSON を通常のオブジェクトに変換
      const OldImage = Converter.unmarshall(record.dynamodb.OldImage);
      const NewImage = Converter.unmarshall(record.dynamodb.NewImage);

      // 在室情報が更新された場合
      if (OldImage.isStay !== NewImage.isStay) {
        const today = moment().utcOffset(9).format("YYYY-MM-DD");

        // 入室した場合
        if (NewImage.isStay) {
          // すでにその日付のオブジェクトが存在する場合
          if (NewImage.stayLab[today]) {
            NewImage.stayLab[today]["inAt"] = moment().utcOffset(9).format();
          } else {
            NewImage.stayLab[today] = { inAt: moment().utcOffset(9).format() };
          }

          // 退室した場合
        } else {
          // すでにその日付のオブジェクトが存在する場合（その日に入室した場合が殆ど）
          if (NewImage.stayLab[today]) {
            // その日に入室している場合
            if (NewImage.stayLab[today]["inAt"]) {
              NewImage.stayLab[today]["outAt"] = moment().utcOffset(9).format(); // 退室時間

              const diffTime = moment().utcOffset(9).diff(moment(NewImage.stayLab[today]["inAt"])); // その日の入室時間との差（ms）を計算

              // すでにその日に一度退室した場合
              if (NewImage.stayLab[today]["stayTime"]) {
                NewImage.stayLab[today]["stayTime"] += diffTime / 1000; // すでにある時間に加算
              } else {
                NewImage.stayLab[today]["stayTime"] = diffTime / 1000;
              }
            } else {
              return;
            }
          } else {
            return;
          }
        }

        updateDynamoDB(NewImage);
      }
    }
  });
};

function updateDynamoDB(Image) {
  const params = {
    TableName: "Students",
    Key: {
      name: Image.name,
    },
    UpdateExpression: "set stayLab = :stayLab",
    ExpressionAttributeValues: {
      ":stayLab": Image.stayLab,
    },
    ReturnValues: "NONE",
  };

  docClient.update(params, (err, data) => {
    if (err) {
      console.error(err);
    }
  });
}
