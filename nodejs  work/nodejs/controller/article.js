var express = require('express');
var router = express.Router();
let { queryAll,add,queryAllSize,deleteOne,queryAllByUser,queryAllByUserSize } = require("../dao/article.js"); // 数据库操作
router.get('/:id', function (req, res) {
    let id = req.params.id
    let page = parseInt( req.query.page )
    let size = parseInt( req.query.size )
  
    queryAll(id,page*size,size, function (success) {
        if (success == null) { 
            res.json({

                status: "400",
                data: '操作失败'
            
            });
        } else {
            var re = success;
         
            queryAllSize(id, function (success) {
             
                res.json({
                    status: "200",
                    data: re,
                    all:success
    
    
                });
            }
           
            )}
        

    })
});


router.get('/user/:id', function (req, res) {
    let id = req.params.id
    let page = parseInt( req.query.page )
    let size = parseInt( req.query.size )
  
    queryAllByUser(id,page*size,size, function (success) {
        if (success == null) { 
            res.json({

                status: "400",
                data: '操作失败'
            
            });
        } else {
            var re = success;
         
            queryAllByUserSize(id, function (success) {
             
                res.json({
                    status: "200",
                    data: re,
                    all:success
    
    
                });
            }
           
            )}
        

    })
});




router.post('/:id', function (req, res) {
    let urlParam = req.body;
    
    add(urlParam, req.params.id,function (success) {
      
            res.json({
                status: "200",
                data: '保存成功'
            });
        

    })
});


router.post('/delete/:id', function (req, res) {
    
    
    deleteOne( req.params.id,function (success) {
      
            res.json({
                status: "200",
                data: '操作成功'
            });
        

    })
});



module.exports = router;