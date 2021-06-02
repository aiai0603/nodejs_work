
let { pool } = require("../db/db.js")
module.exports = {
   

    queryAll: function(params, callback) { // users表中查询全部user操作
      pool.query("SELECT * FROM game", params, function (error, result) {
          if (error) throw error;
          callback(result);
      });
    },
 
}
