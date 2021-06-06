var express = require('express');
var router = express.Router();
let { countAll,add,queryAll,queryAllMax,queryAllMaxById ,queryAllByGame} = require("../dao/record.js"); // 数据库操作


router.post('', function (req, res) {
    let urlParam = req.body;
  
    add(urlParam, function (success) {
      
            res.json({
                status: "200",
                data: '保存成功'
            });
        

    })
});


//params  url路径 /:id
//body  post传表格
//query  get ?a=xxxx


router.get('/:id', function (req, res) {
    let urlParam = req.params.id;
    let page = req.query.page;
    let size = req.query.size;
    queryAll(urlParam,page,size,function (success) {
        let re = success;

        countAll(urlParam,function (success) {
          
                res.json({
                    status: "200",
                    data: re,
                    all:success
                });
            
    
        })
});
});



router.get('/all/max', function (req, res) {
    let urlParam = req.params.id;
    queryAllMax(urlParam, function (success) {
      
            res.json({
                status: "200",
                data: success
            });
        

    })
});



router.get('/rank/:id', function (req, res) {
    let urlParam = req.params.id;
    
    queryAllByGame(urlParam, function (success) {
      
            res.json({
                status: "200",
                data: success
            });
    
    })
});


router.get('/max/:id', function (req, res) {
    let urlParam = req.params.id;
   
    queryAllMaxById(urlParam, function (success) {
      
            res.json({
                status: "200",
                data: success
            });
        

    })
});













module.exports = router;