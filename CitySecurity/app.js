var fs=require('fs');
var express=require('express');
var path=require('path');
var app=express();
var bodyParser=require('body-parser');
var ejsLayouts=require('express-ejs-layouts');

//
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/app_server/view'));


//request objesini alır parçalar
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//app.get('/');
app.use(ejsLayouts);
app.use('/public',express.static(path.join(__dirname,'public')));


//yönlendirici
require('./app_server/route/routeManager')(app);

app.listen(8072);   