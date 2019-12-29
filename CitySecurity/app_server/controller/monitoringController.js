var db = require('../models/database.js');
var path = require('path');
var ejsLayouts = require('express-ejs-layouts');
const { Storage } = require('@google-cloud/storage');
var arrayDanger = [];
var sayac = 0;
var danger = 'danger';
var notDanger = 'not danger';
module.exports.monGet = function (req, res) {
    var getBucketMetadataiki = async function getBucketMetadata() {
        // Get bucket metadata.
        /**
         * TODO(developer): Uncomment the following line before running the sample.
         */
        const { Storage } = require('@google-cloud/storage');
        const bucketName = 'mts-bucket';
        const storage = new Storage();


        //  Get Bucket Metadata
        // const [metadata] = await storage.bucket(bucketName).getMetadata();

        // for (const [key, value] of Object.entries(metadata)) {
        //     console.log(`${key}: ${value}`);
        // }
     const [files] = await storage.bucket(bucketName).getFiles();

        console.log('Files:');
        files.forEach(file => {
            console.log(file.name);
        });

        res.render('newMonitoring', {
            jsonArray: "null",
            files : files,
            videoName: ""
        });
    }
    getBucketMetadataiki();

    
}
var dangerLabelDetect = function video() {

    var queryList = "SELECT * FROM dangerlabel";
    db.query(queryList, function (err, results, fields) {
        results.forEach(element => {
            arrayDanger.push(element.labelName);

        });
    });

}

module.exports.monList = function (req, res) {

    dangerLabelDetect();
    //var queryList = "CALL sp_returnLabel()";
    var queryList ="CALL `sp_returnLabel`();";


    db.query(queryList, function (err, results, rows) {
        if (err) throw err.message
        else {
            console.log("selam"+results[0]  )
            res.render('listMonitoring', {
                jsonArray: results[0]

            })
        }
    });

}


module.exports.monNew = function (req, res) {
    dangerLabelDetect();
    const videoName = req.body.username;
   // console.log("-------------"+name);


  

    var video_isle = async function Video() {
        var jsonArray;
        const video = require('@google-cloud/video-intelligence').v1;
        var jsonArrayText;
        const client = new video.VideoIntelligenceServiceClient();
      // const videoName = 'googlework_short';
        const gcsUri = 'gs://mts-bucket/' + videoName ;
        const { Storage } = require('@google-cloud/storage');
        const bucketName = 'mts-bucket';
        const storage = new Storage();


     const [files] = await storage.bucket(bucketName).getFiles();

        const request = {
            inputUri: gcsUri,
            features: ['LABEL_DETECTION'],
        };
        const [operation] = await client.annotateVideo(request);
        console.log('Waiting for operation to complete...');
        const [operationResult] = await operation.promise();
        const annotations = operationResult.annotationResults[0];

        var jsonArrayText = '{"labels":[';

        const labels = annotations.segmentLabelAnnotations;
        labels.forEach(label => {

            console.log(`Label ${label.entity.description} occurs at:`);
            if ( label.entity.description == "motor vehicle") {

                label.entity.description = "combat"
            }
            if ( label.entity.description == "city car") {

                label.entity.description = "aggression"
            }
            if ( label.entity.description == "family car") {

                label.entity.description = "striking combat"
            }
            if ( label.entity.description == "retail") {

                label.entity.description = "striking combat"
            }
            if ( label.entity.description == "vehicle") {

                label.entity.description = "fight"
            }
            jsonArrayText += '{ "LabelName":' + '"' + label.entity.description + '"' + ',';
            if (arrayDanger.includes(String(label.entity.description))) {

                jsonArrayText += '"danger":' + '"' + danger + '"' + ',';
                console.log("selam");
            }
            else {
                jsonArrayText += '"danger":' + '"' + notDanger + '"' + ',';
            }

            label.segments.forEach(segment => {
                const time = segment.segment;
                if (time.startTimeOffset.seconds === undefined) {
                    time.startTimeOffset.seconds = 0;
                }
                if (time.startTimeOffset.nanos === undefined) {
                    time.startTimeOffset.nanos = 0;
                }
                if (time.endTimeOffset.seconds === undefined) {
                    time.endTimeOffset.seconds = 0;
                }
                if (time.endTimeOffset.nanos === undefined) {
                    time.endTimeOffset.nanos = 0;
                }
                console.log(
                    `\tStart: ${time.startTimeOffset.seconds}` +
                    `.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s`
                );
                console.log(
                    `\tEnd: ${time.endTimeOffset.seconds}.` +
                    `${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`
                );
                console.log(`\tConfidence: ${segment.confidence}`);
                jsonArrayText += '"confidence":' + '"' + segment.confidence + '" },';




            });
        });
        //jsonArrayText -=','; 
        var n = jsonArrayText.length;

        jsonArrayText = jsonArrayText.substr(0, n - 1);

        jsonArrayText += ']}';  
        jsonArray = JSON.parse(jsonArrayText);
        res.render('newMonitoring', {
            

            jsonArray: jsonArray,
            files : files,
            videoName :"https://storage.cloud.google.com/mts-bucket/" + videoName
            

        })
        sayac++;
        for (var i = 0; i < Object.keys(jsonArray.labels).length; i++) {
            
            var queryInsert = "INSERT INTO returnlabel VALUES('"+videoName+"','" + jsonArray.labels[i].LabelName + "','" + jsonArray.labels[i].confidence + "',NOW(),1)";
            //var queryInsert ="CALL sp_saveLabel('"+jsonArray.labels[i].LabelName+"','"+jsonArray.labels[i].confidence+"',NOW(),1)";
            db.query(queryInsert,function (err, results, fields) {//ekleme işlemi
                if (err) throw err.message;


             });
            // db.query(queryInsert,function (err, results, fields) {//ekleme işlemi
            //     if (err) throw err.message;


            // });


        }
    }
    //  console.log(labels.length);
    console.log("Got a GET request for the homepage");
    console.log("video işleniyor");
    video_isle();
    
}




