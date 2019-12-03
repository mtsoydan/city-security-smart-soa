var express = require('express');
var app = express();
var events = require('events');
var eventEmitter = new events.EventEmitter();
const { Storage } = require('@google-cloud/storage');

var liste = [];

app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send("video işleme servisine hoşgeldiniz");

})
app.get('/video', function (req, res) {

    var video_isle = async function Video() {
        const video = require('@google-cloud/video-intelligence').v1;

        const client = new video.VideoIntelligenceServiceClient();
        const gcsUri = 'gs://mts-bucket/googlework_short.mp4';

        const request = {
            inputUri: gcsUri,
            features: ['LABEL_DETECTION'],
        };

        const [operation] = await client.annotateVideo(request);
        console.log('Waiting for operation to complete...');
        const [operationResult] = await operation.promise();
        const annotations = operationResult.annotationResults[0];

        const labels = annotations.segmentLabelAnnotations;
        labels.forEach(label => {
            console.log(`Label ${label.entity.description} occurs at:`);
            liste.push(label.entity.description);
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

        var jsonArray = JSON.parse(JSON.stringify(liste))
        res.send(jsonArray);
    }
    console.log("Got a GET request for the homepage");
    console.log("video işleniyor");
    video_isle()
})


app.get('/update', function (req, res) {

     const bucketName = 'mts-bucket';
     const filename = 'C:/Users/asus/Desktop/NodeApiExample/MyApi/resources/skulent.jpg';

   
    const storage = new Storage();

    async function uploadFile() {
        await storage.bucket(bucketName).upload(filename, {
            
            gzip: true,
            
            metadata: {
               
                cacheControl: 'public, max-age=31536000',
            },
        });

        console.log(`${filename} uploaded to ${bucketName}.`);
    }

    uploadFile();
    res.end();
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
    console.log("Got a GET request for /list_user");
    res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function (req, res) {
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
