
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'citysecuritysystem'
});




connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('bağlantı başarılı');
    }
});
module.exports=connection;


