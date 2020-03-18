var AWS = require('aws-sdk');
AWS.config.loadFromPath('awscredentials.json');
function S3(callback) {
    var s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    s3.listBuckets(function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else return callback(data);
    });
}
function ECS(callback) {
    var ecs = new AWS.ECS({ apiVersion: '2016-01-01' });
    ecs.listClusters(function (err, data) {
      if (err) console.log(err, err.stack);
      else return callback(data);
    })
  }
  function DAX(callback) {
    var dax = new AWS.DAX({ apiVersion: '2017-04-19' });
    dax.describeClusters(function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else return callback(data);           // successful response
    });
  }
module.exports = { S3,ECS,DAX };