/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /* 
'use strict';
async function main() {
  // [START video_quickstart]
  // Imports the Google Cloud Video Intelligence library
  const videoIntelligence = require('@google-cloud/video-intelligence');

  // Creates a client
  const client = new videoIntelligence.VideoIntelligenceServiceClient();

  // The GCS uri of the video to analyze
  const gcsUri = 'gs://mts-bucket/deneme.mp4';

  // Construct request
  const request = {
    inputUri: gcsUri,
    features: ['LABEL_DETECTION'],
  };

  // Execute request
  const [operation] = await client.annotateVideo(request);

  console.log(
    'Waiting for operation to complete... (this may take a few minutes)'
  );

  const [operationResult] = await operation.promise();

  // Gets annotations for video
  const annotations = operationResult.annotationResults[0];

  // Gets labels for video from its annotations
  const labels = annotations.segmentLabelAnnotations;
  labels.forEach(label => {
    console.log(`Label ${label.entity.description} occurs at:`);
    label.segments.forEach(segment => {
      segment = segment.segment;
      if (segment.startTimeOffset.seconds === undefined) {
        segment.startTimeOffset.seconds = 0;
      }
      if (segment.startTimeOffset.nanos === undefined) {
        segment.startTimeOffset.nanos = 0;
      }
      if (segment.endTimeOffset.seconds === undefined) {
        segment.endTimeOffset.seconds = 0;
      }
      if (segment.endTimeOffset.nanos === undefined) {
        segment.endTimeOffset.nanos = 0;
      }
      console.log(
        `\tStart: ${segment.startTimeOffset.seconds}` +
          `.${(segment.startTimeOffset.nanos / 1e6).toFixed(0)}s`
      );
      console.log(
        `\tEnd: ${segment.endTimeOffset.seconds}.` +
          `${(segment.endTimeOffset.nanos / 1e6).toFixed(0)}s`
      );
      console.log(`\tConfidence: ${segment.confidence}`);

    });
  });
  // [END video_quickstart]
}

main().catch(console.error);
*/
async function main() {

// Imports the Google Cloud Video Intelligence library
const video = require('@google-cloud/video-intelligence').v1;

// Creates a client
const client = new video.VideoIntelligenceServiceClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
 const gcsUri = 'gs://mts-bucket/deneme.mp4';

const request = {
  inputUri: gcsUri,
  features: ['LABEL_DETECTION'],
};

// Detects labels in a video
const [operation] = await client.annotateVideo(request);
console.log('Waiting for operation to complete...');
const [operationResult] = await operation.promise();

// Gets annotations for video
const annotations = operationResult.annotationResults[0];

const labels = annotations.segmentLabelAnnotations;
labels.forEach(label => {
  console.log(`Label ${label.entity.description} occurs at:`);
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
  });
});
}
main().catch(console.error);
