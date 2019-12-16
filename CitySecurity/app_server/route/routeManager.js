var routeLogin = require('./loginRoute');
var routeHome = require('./homeRoute');
var routeMon = require('./monitoringRoute');
var routeUpload = require('./uploadRoute');



module.exports = function (app) {

    app.use('/', routeLogin)
    app.use('/home', routeHome)
    app.use('/monitoring', routeMon)
    app.use('/upload', routeUpload)
    
}