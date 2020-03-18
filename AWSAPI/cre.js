const AWS = require('aws-sdk');
AWS.config.loadFromPath('awscredentials.json');
AWS.config.region = 'us-east-1';

// AWS.config.getCredentials(function(err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     //console.log(data);
//      console.log("Access key:", AWS.config.credentials.accessKeyId);
//      console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
//   }
// });
var sts = new AWS.STS();
var params = {
    AccessKeyId: AWS.config.credentials.accessKeyId /* required */
  };
  sts.getAccessKeyInfo(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });