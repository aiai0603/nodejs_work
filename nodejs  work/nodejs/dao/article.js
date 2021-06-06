
let { pool } = require("../db/db.js")
module.exports = {
   
    queryAll: function(id,page,size, callback) { // users表中查询全部user操作
      let sqlmap = [id,page,size
      ]
      pool.query("SELECT a.id,b.id as uid,a.text,a.date,b.name FROM article as a,user as b where a.userid =b.id and a.gameid =? and a.deleteflag = 0 order by id desc limit ?,?", sqlmap, function (error, result) {
          if (error) throw error;
          callback(result);
      });
    },

    queryAllByUser: function(id,page,size, callback) { // users表中查询全部user操作
      let sqlmap = [id,page,size]
      pool.query("SELECT a.id,b.id as uid,a.text,a.date,b.name,c.name as game FROM article as a,user as b,game as c where a.userid =b.id and a.userid =? and a.gameid = c.id and a.deleteflag = 0 order by id desc limit ?,?", sqlmap, function (error, result) {
          if (error) throw error;
          callback(result);
      });
    },

    queryAllByUserSize: function(id, callback) { // users表中查询全部user操作
      let sqlmap = [id
      ]
      pool.query("SELECT count (*) as sum FROM article  where userid =? and deleteflag = 0 ", sqlmap, function (error, result) {
          if (error) throw error;
          callback(result);
      });
    },

    queryAllSize: function(id, callback) { // users表中查询全部user操作
      let sqlmap = [id
      ]
      pool.query("SELECT count (*) as sum FROM article  where gameid =? and deleteflag = 0 ", sqlmap, function (error, result) {
          if (error) throw error;
          callback(result);
      });
    },

    add: function (article,gid ,callback) { // users表中增加user操作
      let sqlparam = [
        article.uid?article.uid:"",
        gid,
        article.text ? article.text : "",
        article.date ? article.date : new Date()
      ]
  
      pool.query("INSERT INTO article(userid,gameid,text,date,deleteflag) VALUES (?,?,?,?,0);", sqlparam, function (error, result) {
        if (error) throw error;
        callback(result);
      });
    },


    deleteOne: function (id,callback) { // users表中增加user操作
      let sqlparam = [
          id
      ]
  
      pool.query("UPDATE article SET deleteflag = 1 where id = ?", sqlparam, function (error, result) {
        if (error) throw error;
        callback(result);
      });
    },

    

 
}
