var db = require('../models/database');
var path = require('path');

module.exports.indexGet = function (req, res) {
    //ejs ye yönlendirme - hangi dosyanın çalışacağını belirtme
    res.render('login',{
        hata :""
    });
}
module.exports.indexPost = function (req, res) {

    var username = req.body.username;
    var queryUser = "SELECT `password` FROM `usertable` WHERE `username`='" + username + "'";

    db.query(queryUser, function (err, results) {//listeleme işlemi
        if (err) throw err;

        else {
            var userResult = results;

            if (req.body.password == userResult[0].password) {
                res.render('home');
                
            }
            else {
                res.render('login',{
                    hata:'Hatalı Giriş'
                });
            }
        }

        // db.end(function (err) {
        //     if (err) throw err;

        //     console.log('bağlantı  kapatıldı.');

        // });

    });


    // console.log(req.body);//gönderilen requestin içeriği
    // res.render('login',{  

    //    username:req.body.username,
    //    password:req.body.password

    // })
}
