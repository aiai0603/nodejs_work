
let { pool } = require("../db/db.js")
module.exports = {
    add: function (user, callback) { // users表中增加user操作
        let sqlparam = [
        
            user.name?user.name:"",
            user.pass?user.pass:"",
            user.email?user.email:"",
            user.level?user.level:1

        ]
        
        pool.query("INSERT INTO user(name,password,email,level) VALUES (?,?,?, ?);", sqlparam, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },


    queryOne: function(params, callback) { // users表中删除指定user操作
      
        let sqlparam = [params]
      
        
        pool.query("SELECT * FROM user WHERE id = ?;", sqlparam, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    query: function(params, callback) { // users表中查询指定user操作
        let {name,pass} = params
        let sqlparam = [name,pass]
        pool.query("SELECT * FROM user WHERE name = ? AND password = ?;", sqlparam, function (error, result) {
            if (error) throw error;
            callback(result[0]);
        });
    },

    findByName: function(params, callback) { // users表中查询指定user操作
        let {name} = params
        let sqlparam = [name]
        pool.query("SELECT * FROM user WHERE name = ?;", sqlparam, function (error, result) {
            if (error) throw error;
            callback(result[0]);
        });
    },


    queryAll: function(params, callback) { // users表中查询全部user操作
      pool.query("SELECT * FROM users", params, function (error, result) {
          if (error) throw error;
          callback(result);
      });
    },
    update: function(params, callback) { // users表中更新user操作
      pool.query("UPDATE user set name= ?,password=?,email=? where id = ?;", [params.name,params.pass,params.email,params.id], function (error, result) {
          if (error) throw error;
          callback(result);
      });
    },
}
