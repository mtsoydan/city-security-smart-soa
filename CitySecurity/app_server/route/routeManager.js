var routeLogin = require('./loginRoute');
var routeHome = require('./homeRoute');
var routeMon = require('./monitoringRoute');



module.exports = function (app) {

   

    app.use('/', routeLogin);
    app.use('/home', routeHome);
    app.use('/monitoring', routeMon);


}