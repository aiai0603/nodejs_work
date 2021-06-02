
var mysql               = require('mysql');


var pool = mysql.createConnection({      //创建mysql实例
    host:'47.97.158.11',
    port:'3306',
    user:'root',
    password:'Sss991126/',
    database:'node'
});




module.exports ={
    pool
}