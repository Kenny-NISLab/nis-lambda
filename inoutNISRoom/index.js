const AWS = require("aws-sdk");
const moment = require("moment");

AWS.config.update({
  region: "ap-northeast-1",
  endpoint: "dynamodb.ap-northeast-1.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  // 変更イベントが配列として渡される
  event.Records.map((record) => {
    if (record.eventName === "MODIFY") {
      const OldImage = record.dynamodb.OldImage;
      const NewImage = record.dynamodb.NewImage;

      if (OldImage.isStay !== NewImage.isStay) {
        console.log("DynamoDB Modify:", OldImage, NewImage);

        // const now = Date.parse(new Date()).toString(10);

        // let inout = null;
        // if(newItem.is_stay.BOOL){
        //   inout = 'in';
        // }else{
        //   inout = 'out';
        // }

        // const item = {
        //   'id': newItem.id,
        //   'created_at': {N: now},
        //   'j_full_name': newItem.j_full_name,
        //   'e_full_name': newItem.e_full_name,
        //   'inout': {S: inout},
        // };

        // dynamodbPut(item);
      }
    }
  });
};

function dynamodbPut(item) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: item,
  };

  docClient.putItem(params, function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Success:", data);
    }
  });
}
