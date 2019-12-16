//const { Storage } = require('@google-cloud/storage');
var db = require('../models/database.js');
var path = require('path');
var ejsLayouts = require('express-ejs-layouts');
const formidable = require('formidable');

const { Storage } = require('@google-cloud/storage');


module.exports.monUp = function (req, res) {
    console.log("/////////selam");
    res.render('upload')
}

module.exports.monPost = function (req, res) {
    const bucketName = 'mts-bucket';
    const filename =req.body.username ;
    console.log(filename+"//////////");

    // const storage = new Storage();

    // async function uploadFile() {
    //     await storage.bucket(bucketName).upload(filename, {

    //         gzip: true,

    //         metadata: {

    //             cacheControl: 'public, max-age=31536000',
    //         },
    //     });

    //     console.log(`${filename} uploaded to ${bucketName}.`);
    // }
    // uploadFile();
    // res.end();

}












/*
app.get('/update', function (req, res) {






})
*/