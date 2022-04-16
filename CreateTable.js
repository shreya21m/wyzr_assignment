// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-south-1'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  AttributeDefinitions: [
    {
      AttributeName: 'EMAIL',
      AttributeType: 'S'
    },
    {
      AttributeName: 'SEARCH_QUERY',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'EMAIL',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'SEARCH_QUERY',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'SEARCH_HISTORY11',
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});