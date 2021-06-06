
let { pool } = require("../db/db.js")
module.exports = {
  add: function (record, callback) { // users表中增加user操作
    let sqlparam = [

      record.userid ? record.userid : "",
      record.gameid ? record.gameid : "",
      record.score ? record.score : "",
      record.date ? record.date : new Date()
    ]

    pool.query("INSERT INTO record(userid,gameid,score,date) VALUES (?,(select id from game where name = ?),?,?);", sqlparam, function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },


  queryAll: function (id,page,size, callback) { 

    let sqlparam = [id,page*size, parseInt( size)]

    pool.query("SELECT a.id,a.score,a.date,b.name FROM record as a,game as b WHERE a.userid = ? AND a.gameid = b.id ORDER BY a.date DESC limit ?,?", sqlparam, function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },

  
  queryAllMax: function (id, callback) { 

    let sqlparam = []
    pool.query("SELECT a.id,MAX(b.score) as max FROM game as a LEFT JOIN record as b ON a.id = b.gameid GROUP BY a.id", sqlparam, function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },


  queryAllByGame: function (id, callback) { 

    
    let sqlparam = [id]
    pool.query("SELECT b.name,a.score,a.date FROM record as a,user as b WHERE a.gameid = ? AND a.userid = b.id ORDER BY a.score desc limit 0,5", sqlparam, function (error, result) {
      if (error) throw error;
      callback(result);
    });
    
  },


  countAll: function (id, callback) { 

    
    let sqlparam = [id]
    pool.query("SELECT count (*) as sum from record where userid = ?", sqlparam, function (error, result) {
      if (error) throw error;
      callback(result);
    });
    
  },

  queryAllMaxById: function (id, callback) { // users表中增加user操作

    let sqlparam = [id]

    pool.query("SELECT a.id,MAX(b.score) as max FROM game as a LEFT JOIN record as b ON a.id = b.gameid AND b.userid = ? GROUP BY a.id", sqlparam, function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },

 

}
