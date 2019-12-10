var db = require('../models/database.js');
var path = require('path');
var ejsLayouts=require('express-ejs-layouts');
//const { Storage } = require('@google-cloud/storage');

module.exports.monGet=function(req,res) {
    
    res.render('newMonitoring',{
        jsonArray:"null"
    });
}

module.exports.monList = function (req, res) {
    res.render('listMonitoring', {
        jsonArray:"null"

     
    })
}
module.exports.monNew = function (req, res) {
    var video_isle = async function Video() {
        var jsonArray;
        const video = require('@google-cloud/video-intelligence').v1;
    var jsonArrayTextex;
        const client = new video.VideoIntelligenceServiceClient();
        const gcsUri = 'gs://mts-bucket/cat.mp4';

        const request = {
            inputUri: gcsUri,
            features: ['LABEL_DETECTION'],
        };
        const [operation] = await client.annotateVideo(request);
        console.log('Waiting for operation to complete...');
        const [operationResult] = await operation.promise();
        const annotations = operationResult.annotationResults[0];

        var jsonArrayText ='{"labels":[';

        const labels = annotations.segmentLabelAnnotations;
        labels.forEach(label => {
            console.log(`Label ${label.entity.description} occurs at:`);
            jsonArrayText += '{ "LabelName":' +'"'+label.entity.description+'"'+',';

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
                jsonArrayText +='"confidence":'+'"'+segment.confidence+'" },';



            });
        });
        //jsonArrayText -=','; 
        var n = jsonArrayText.length;

        jsonArrayText = jsonArrayText.substr(0,n-1);

        jsonArrayText +=']}';
        

        jsonArray = JSON.parse(jsonArrayText);
        res.render('newMonitoring', {
            jsonArray:jsonArray

         
        })

        //  for(var i=0; i < Object.keys(jsonArray.labels).length; i++){
        //     var queryInsert="INSERT INTO returnlabel VALUES(' ','"+jsonArray.labels[i].LabelName+"','"+jsonArray.labels[i].confidence+"',NOW(),1)";
        //     db.query(queryInsert, function (err, results, fields) {//ekleme işlemi
        //         if (err) throw err.message;
                
        
        //     });
          
        // }
    }
  //  console.log(labels.length);
    console.log("Got a GET request for the homepage");
    console.log("video işleniyor");
    video_isle();
}