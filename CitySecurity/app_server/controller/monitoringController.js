
// /**
//  * Copyright 2017, Google, Inc.
//  * Licensed under the Apache License, Version 2.0 (the `License`);
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *    http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an `AS IS` BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

// 'use strict';


//   async function main() {
//     // [START video_analyze_labels]
//     // Imports the Google Cloud Video Intelligence library + Node's fs library
//     const video = require('@google-cloud/video-intelligence').v1;
//     const fs = require('fs');
//     const util = require('util');
  
//     // Creates a client
//     const client = new video.VideoIntelligenceServiceClient();
  
//     /**
//      * TODO(developer): Uncomment the following line before running the sample.
//      */
//      const path = 'C:/Users/BHR/Downloads/Compressed/nodejs-video-intelligence-master/nodejs-video-intelligence-master/samples/resources/14.mp4';
  
//     // Reads a local video file and converts it to base64
//     const readFile = util.promisify(fs.readFile);
//     const file = await readFile(path);
//     const inputContent = file.toString('base64');
  
//     // Constructs request
//     const request = {
//       inputContent: inputContent,
//       features: ['LABEL_DETECTION'],
//     };
  
//     // Detects labels in a video
//     const [operation] = await client.annotateVideo(request);
//     console.log('Waiting for operation to complete...');
//     const [operationResult] = await operation.promise();
//     // Gets annotations for video
//     const annotations = operationResult.annotationResults[0];
  
//     const labels = annotations.segmentLabelAnnotations;
//     labels.forEach(label => {
//       console.log(`Label ${label.entity.description} occurs at:`);
//       label.segments.forEach(segment => {
//         const time = segment.segment;
//         if (time.startTimeOffset.seconds === undefined) {
//           time.startTimeOffset.seconds = 0;
//         }
//         if (time.startTimeOffset.nanos === undefined) {
//           time.startTimeOffset.nanos = 0;
//         }
//         if (time.endTimeOffset.seconds === undefined) {
//           time.endTimeOffset.seconds = 0;
//         }
//         if (time.endTimeOffset.nanos === undefined) {
//           time.endTimeOffset.nanos = 0;
//         }
//         console.log(
//           `\tStart: ${time.startTimeOffset.seconds}` +
//             `.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s`
//         );
//         console.log(
//           `\tEnd: ${time.endTimeOffset.seconds}.` +
//             `${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`
//         );
//         console.log(`\tConfidence: ${segment.confidence}`);
//       });
//     });
  
//     // [END video_analyze_labels]
//   }
  
//   main().catch(console.error);
   





var user = require('../models/dbIslemleri.js');
var path = require('path');
var ejsLayouts=require('express-ejs-layouts');
//const { Storage } = require('@google-cloud/storage');

module.exports.monGet=function(req,res) {
    res.render('newMonitoring');
}

module.exports.monList = function (req, res) {
    res.render('listMonitoring', {
        jsonArray:jsonArray

     
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
    }
  //  console.log(labels.length);
    console.log("Got a GET request for the homepage");
    console.log("video işleniyor");
    video_isle();
}