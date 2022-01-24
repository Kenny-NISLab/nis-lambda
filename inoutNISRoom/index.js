const AWS = require("aws-sdk");

AWS.config.update({region: process.env.DYNAMODB_REGION});
const dynamoDB = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// const dynamoDB = new AWS.DynamoDB.DocumentClient({
//   region: process.env.DYNAMODB_REGION,
// });

exports.handler = (event, context, callback) => {

  // 変更イベントが配列として渡される
  event.Records.map(record => {

    if(record.eventName === 'MODIFY'){
      const oldItem = record.dynamodb.OldImage;
      const newItem = record.dynamodb.NewImage;

      if(oldItem.is_stay !== newItem.is_stay){

        const now = Date.parse(new Date()).toString(10);

        let inout = null;
        if(newItem.is_stay.BOOL){
          inout = 'in';
        }else{
          inout = 'out';
        }

        const item = {
          'id': newItem.id,
          'created_at': {N: now},
          'j_full_name': newItem.j_full_name,
          'e_full_name': newItem.e_full_name,
          'inout': {S: inout},
        };

        dynamodbPut(item);
      }
    }
  });
};

function dynamodbPut(item){
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: item,
  };

  dynamoDB.putItem(params, function (err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Success:", data);
    }
  });
}
