var express             = require('express');
var app                 = express();
var bodyParse           =require('body-parser')

require('./db/db.js');

var userRouter = require('./controller/user.js');
var gameRouter = require('./controller/game.js');
var recordRouter = require('./controller/record.js');
var articleRouter = require('./controller/article.js');


//增加头部信息解决跨域问题
app.all('*', function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//使用bodyParse解释前端提交数据
app.use(bodyParse.urlencoded({extended:true})) ;
app.use(bodyParse.json());


app.use('/user', userRouter);
app.use('/game', gameRouter);
app.use('/record', recordRouter);
app.use('/article', articleRouter);



// 监听3000端口
var server=app.listen(3000);

