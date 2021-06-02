var express = require('express');
var router = express.Router();
let { add,queryAll,queryAllMax,queryAllMaxById ,queryAllByGame} = require("../dao/record.js"); // 数据库操作


router.post('', function (req, res) {
    let urlParam = req.body;
    console.log(urlParam)
    add(urlParam, function (success) {
      
            res.json({
                status: "200",
                data: '保存成功'
            });
        

    })
});


router.get('/:id', function (req, res) {
    let urlParam = req.params.id;
    let page = req.query.page;
    let size = req.query.size;
    queryAll(urlParam,0,6,function (success) {
      
            res.json({
                status: "200",
                data: success
            });
        

    })
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
    console.log(urlParam)
    queryAllMaxById(urlParam, function (success) {
      
            res.json({
                status: "200",
                data: success
            });
        

    })
});













module.exports = router;