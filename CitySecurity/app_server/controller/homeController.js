var path = require('path');
module.exports.index=function(req,res){
    res.render('home');
}

module.exports.aboutUs=function(req,res){
    res.render('aboutUs');
}