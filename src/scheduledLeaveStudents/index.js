const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: process.env.DYNAMODB_REGION,
});

exports.handler = function (event, context, callback) {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
    };

    dynamoDB.scan(params, function (err, data) {
        if (err) {
            console.log('Error:', err);
        } else {
            const students = data.Items;
            leaveAllStudents(students);
        }
    });
};

function leaveAllStudents (students) {
    students.forEach(student => {
        leaveStudent(student);
    });
}

function leaveStudent (student) {
    if (student.is_stay) {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                'id': student.id
            },
            UpdateExpression: 'set is_stay = :v',
            ExpressionAttributeValues: {
                ':v': false
            },
            ReturnValues: 'UPDATED_NEW'
        };
        
        dynamoDB.update(params, function(err, data) {
            if (err) {
                console.log('Error:', err);
            }
        });
    }
}
