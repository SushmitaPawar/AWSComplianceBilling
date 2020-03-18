'use strict';

const fs = require('fs');
const express = require('express')
const app = express()
app.use(express.json());
const AWS = require('aws-sdk');
var port = 3000;
var awsapi = require('./API.js');
var result, result1, result2, result3, result4,result5;
var finalresult = []; var finalresult1 = []; var finalresult2 = []; var finalresult3 = [];
var finalresult4 = [];var finalresult5 = [];
app.post('/AWSAPI/postCredentials', (req, res) => {
    let awscredentialdata = {

        accessKeyId: req.body.accessKeyId,
        secretAccessKey: req.body.secretAccessKey,
        region: req.body.region
    }
    let awsfile = JSON.stringify(awscredentialdata);
    fs.writeFileSync('awscredentials.json', awsfile);
    AWS.config.loadFromPath('awscredentials.json');
    var sts = new AWS.STS();
    var params = {
        AccessKeyId: AWS.config.credentials.accessKeyId /* required */
    };
    sts.getAccessKeyInfo(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            res.json(err);
        }
        else {
            console.log(data);
            res.json(data);

        }           // successful response
    });
})
app.get('/AWSAPI/getData', (req, res) => {
    AWS.config.loadFromPath('awscredentials.json');
    var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
    var params1 = {
        AllRegions: true
    };
    var reg = [];
    ec2.describeRegions(params1, function (err, regions) {

        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            for (var i = 0; i < regions.Regions.length; i++) {
                reg.push(regions.Regions[i].RegionName);
            }
            console.log("array", reg);
            res.json(reg);
        }
    });
})
var bucketlist;
function listbuckets(callback) {
    awsapi.S3(function (data) {
        if (data.Buckets == '') {
            console.log("There are NO Buckets.");
            //res.json("There are NO Buckets.");
        }
        else {
            bucketlist = data.Buckets.map(function (bucketss) {
                return bucketss.Name;
            })

            return callback(bucketlist);
        }
    })
}

app.get('/AWSAPI/getS3Policy', (req, res) => {
    AWS.config.loadFromPath('awscredentials.json');
    function policy() {
        return new Promise(function (resolve, reject) {
            listbuckets(function (bucketlist) {
                var countp = 1; var counte = 1;
                bucketlist.forEach(function (s3d) {
                    var s3 = new AWS.S3({ params: { Bucket: s3d } });
                    s3.getBucketPolicy(function (err, data) {

                        result = ((err) ? "The Bucket does not have policy" + (counte++) : (JSON.stringify(data)) + (countp++))
                        finalresult.push(result + "::" + s3d);
                        // resolve(finalresult);+" "+(countp++)
                        // reject(err);+" "+(counte++)

                    })
                });
            })
        });
    }
    policy();
    Promise.all(finalresult).then(() => res.send(finalresult));
})

app.get('/AWSAPI/getS3Lifecycle', (req, res) => {
    AWS.config.loadFromPath('awscredentials.json');
    function lifecycle() {
        return new Promise(function (resolve, reject) {
            listbuckets(function (bucketlist) {
                var countp = 1; var counte = 1;
                bucketlist.forEach(function (s3d) {
                    var s3 = new AWS.S3({ params: { Bucket: s3d } });
                    s3.getBucketLifecycleConfiguration(function (err, data) {
                        result1 = ((err) ? "The lifecycle configuration for the  Amazon S3 bucket is not enabled." + (counte++) : (JSON.stringify(data)) + (countp++))
                        finalresult1.push(result1 + "::" + s3d);
                        //resolve(data);
                        //reject(err);
                    });
                })
            })
        })
    }
    lifecycle();
    Promise.all(finalresult1).then(() => res.send(finalresult1));
})

app.get('/AWSAPI/getS3TransferAcceleration', (req, res) => {
    AWS.config.loadFromPath('awscredentials.json');
    function cust_S3TransferAcceleration() {
        return new Promise(function (resolve, reject) {
            listbuckets(function (bucketlist) {
                var countp = 1; var counte = 1;
                bucketlist.forEach(function (s3d) {
                    var s3 = new AWS.S3({ params: { Bucket: s3d } });
                    s3.getBucketAccelerateConfiguration(function (err, data) {

                        result2 = ((data) ? "The feature was never enabled, the S3 Transfer Acceleration is not in use for the selected Amazon S3 bucket." + (countp++) : (data.Status) + (counte++))
                        finalresult2.push(result2 + "::" + s3d);
                        //resolve(results);
                        //reject(err);
                    });
                });
            })

        })
    }
    cust_S3TransferAcceleration();
    Promise.all(finalresult2).then(() => res.send(finalresult2));
});
app.get('/AWSAPI/getHealth', (req, res) => {
    AWS.config.loadFromPath('awscredentials.json');
    function health() {
        return new Promise(function (resolve, reject) {
            var countp = 1; var counte = 1;
            var health = new AWS.Health({ apiVersion: '2016-08-04' });
            health.describeEvents(function (err, data) {
                result3 = ((err.SubscriptionRequiredException == null) ? "Calling the Health API from an account that does not have a Business or Enterprise support plan causes a SubscriptionRequiredException'" + (counte++) : (JSON.stringify(data)) + (countp++))
                finalresult3.push(result3);
                // resolve(finalresult);+" "+(countp++)
                // reject(err);+" "+(counte++)
            })
        })
    }
    health();
    Promise.all(finalresult3).then(() => res.send(finalresult3));
});

var list;
function ECSclusterlist(callback) {
    awsapi.ECS(function (data) {

        list = data.clusterArns.map(function (arns) {
            return arns;
        })
        return callback(list);
    })
}
app.get('/AWSAPI/getECScontainerInsights', (req, res) => {
    AWS.config.loadFromPath('awscredentials.json');
    function containerInsights() {
        return new Promise(function (resolve, reject) {
            ECSclusterlist(function (list) {
                if (list == "") {
                    result4 = "There are NO Cluster Arns.";
                    finalresult4.push(result4);
                } else {
                    list.forEach(function (cluster) {
                        var ecs = new AWS.ECS({ params: { clusters: cluster } });
                        ecs.describeClusters(function (err, data) {
                            result4 = ((data.clusters[0].settings.value == "DISABLED") ? "the CloudWatch Container Insights feature is not currently enabled for the selected Amazon Elastic Container Service (ECS) cluster. " + (counte++) : "the CloudWatch Container Insights feature is currently enabled" + (countp++))
                            finalresult4.push(result4 + "::" + cluster)
                            //console.log("sds", finalresult4);
                            // resolve(finalresult);+" "+(countp++)
                            // reject(err);+" "+(counte++)
                        }
                        )
                    })
                }
            })

        })
    }
    containerInsights();
    Promise.all(finalresult4).then(() => res.send(finalresult4));
});
var clusterlist;
function DAXclusternames(callback) {
    awsapi.DAX(function (data) {

        clusterlist = data.Clusters.map(function (clusters) {
            return clusters.ClusterName;
        })
        return callback(clusterlist);


    })
}
app.get('/AWSAPI/getDAXclusterEncryption', (req, res) => {
    AWS.config.loadFromPath('awscredentials.json');
    function clusterencryption() {
        return new Promise(function (resolve, reject) {
            DAXclusternames(function (clusterlist) {
                var countp = 1; var counte = 1;
                if (clusterlist == "") {
                    result5 = "There are NO Cluster Names.";
                    finalresult5.push(result5);
                } else {
                    clusterlist.forEach(function (name) {
                        var dax = new AWS.DAX({ params: { ClusterNames: name } });
                        dax.describeClusters(function (err, data) {
                            if (err) console.log(err, err.stack); // an error occurred
                            else {
                                result5 = ((data.SSEDescription.Status == "DISABLED") ? "The Server-Side Encryption feature is currently disabled, therefore encryption at rest is not active for the selected Amazon DynamoDB Accelerator (DAX) cluster." + (counte++) : "The Server-Side Encryption feature is enabled." + (countp++))
                                finalresult5.push(result5 + "::" + name)
                                //console.log("sds", finalresult5);
                                // resolve(finalresult);+" "+(countp++)
                                // reject(err);+" "+(counte++)
                            }
                        }
                        )
                    })
                }
            })
        })
    }
    clusterencryption();
    Promise.all(finalresult5).then(() => res.send(finalresult5));
});
function cust_S3BucketDefaultEncryption() {
    return new Promise(function (resolve, reject) {
        listbuckets(function (bucketlist) {
            bucketlist.forEach(function (s3d) {


                var s3 = new AWS.S3({ params: { Bucket: s3d } });
                s3.getBucketEncryption(function (err, data) {
                    if (err) console.log("An error occurred (ServerSideEncryptionConfigurationNotFoundError) when calling the GetBucketEncryption operation: The server side encryption configuration was not found.therefore the selected S3 bucket does not encrypt automatically all objects when stored in Amazon S3.");
                    else {
                        console.log(JSON.stringify(data));
                        res.json(data);
                        d = data.ServerSideEncryptionConfiguration;

                    }
                    resolve();
                    reject(err);
                })
            })

        })
    })

}
var results;
function cust_S3BucketPublicAccessViaPolicy() {
    return new Promise(function (resolve, reject) {
        listbuckets(function (bucketlist) {
            bucketlist.forEach(function (s3d) {

                var s3 = new AWS.S3({ params: { Bucket: s3d } });
                s3.getBucketPolicy(function (err, data) {
                    if (err) console.log("The Bucket does not have any bucket policy");
                    else {

                        Object.values(JSON.parse('[' + data.Policy + ']')).forEach(function (value) {
                            Object.keys(value).forEach(function (key) {
                                results = (((value[key][0].hasOwnProperty("Effect" && "Principal") ? "has princ" : "not has princ") && (value[key][0].Effect) == "Allow" && (value[key][0].Principal) == "*") ? "publicly accessible" : "not accessible")
                            })
                        })
                        res.end(results);
                        console.log(results)
                    }
                })

            });
        })
    })
}

function cust_S3BucketsEncryptedwithCustomerProvidedCMKs() {
    return new Promise(function (resolve, reject) {
        listbuckets(function (bucketlist) {
            bucketlist.forEach(function (s3d) {
                var s3 = new AWS.S3({ params: { Bucket: s3d } });

                s3.getBucketEncryption(function (err, getBucketEncryption) {
                    if (err) console.log("An error occurred (ServerSideEncryptionConfigurationNotFoundError) when calling the GetBucketEncryption operation: The server side encryption configuration was not found.");
                    else {

                        Object.values(getBucketEncryption).forEach(function (value) {

                            Object.keys(value).forEach(function (key) {
                                var results = ((value[key][0].ApplyServerSideEncryptionByDefault.SSEAlgorithm == "AES256" || "aws:kms") ? "the SSE configuration for the selected AWS S3 bucket is not compliant" : "the SSE configuration for the selected AWS S3 bucket is compliant")
                                console.log(results);
                                res.json(results);
                            })
                        })
                    }
                    resolve(results);
                    reject();
                });
            })
        })
    })
}


// policy().then(function () {
//     cust_S3TransferAcceleration().then(function () {
//         lifecycle().then(function () {
//             cust_S3BucketDefaultEncryption().then(function () {
//                 cust_S3BucketPublicAccessViaPolicy().then(function () {
//                     cust_S3BucketsEncryptedwithCustomerProvidedCMKs();
//                 })
//             })
//         })
//     })
// });



app.get('/AWSAPI/getServices', (req, res) => {
    AWS.config.loadFromPath('awscredentials.json');
    var servicequotas = new AWS.ServiceQuotas();
    var params2 = {
        MaxResults: 100
    };
    var ser = [];
    servicequotas.listServices(params2, function (err, service) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            for (var i = 0; i < service.Services.length; i++) {
                ser.push(service.Services[i].ServiceName);
            } console.log("Services", ser);
            res.json(ser);
        }
    });
})

app.post('/AWSAPI/postData', (req, res) => {

    AWS.config.loadFromPath('awscredentials.json');
    var costexplorer = new AWS.CostExplorer({ apiVersion: '2017-10-25' });
    var startdate = moment(req.body.Start.year + '-' + req.body.Start.month + '-' + req.body.Start.day).format('YYYY-MM-DD');
    var enddate = moment(req.body.End.year + '-' + req.body.End.month + '-' + req.body.End.day).format('YYYY-MM-DD');
    console.log('startdate', startdate);
    console.log('enddate', enddate);
    var params = {
        "TimePeriod": { /* required */
            "Start": startdate, /* required */
            "End": enddate /* required */
        },
        "Granularity": req.body.Granularity,
        "Metrics": ["BlendedCost", "UnblendedCost", "UsageQuantity"],
        "Filter": {
            "Dimensions": {
                'Key': 'SERVICE',
                'Values': ['Amazon Elastic Compute Cloud - Compute', 'Amazon Simple Storage Service', 'Amazon Elasticsearch Service']
                //'Values' : ['Amazon Elastic Compute Cloud (Amazon EC2)','Amazon Simple Storage Service (Amazon S3)','Amazon Elasticsearch Service (Amazon ES)']
            }
        },
        GroupBy: [
            {
                'Type': 'DIMENSION',
                'Key': 'SERVICE'
            },
            {
                'Type': 'DIMENSION',
                'Key': 'USAGE_TYPE'
            }
        ]
    };
    costexplorer.getCostAndUsage(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            res.json(err); // an error occurred
        }
        else {
            console.log(JSON.stringify("Success", data));
            var display = data;
            console.log("displayobj:", display);
            res.json(display);
        }

    });

})

app.listen(port);
console.log('Browse to http://127.0.0.1:' + port);
