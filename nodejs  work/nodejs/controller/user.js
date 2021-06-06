var express = require('express');
var router = express.Router();
let { add, query,findByName, queryOne, update } = require("../dao/user.js"); // 数据库操作



router.post('/:id', function (req, res, next) {
    let urlParam = req.body;
    
    findByName(urlParam, function (success) {
        if (success!=null && success.id!= urlParam.id) {
            res.json({
                status: "400",
                data: '账号已经被用过了哦'
            });
        } else {
            
            update(urlParam, function (success) {
                if (success == null) {
                    res.json({
                        status: "400",
                        data: '操作失败'
                    });
                } else {
                    res.json({
                        status: "200",
                        data: ""
                    });
                }

            })
        }

    })

});





router.post('', function (req, res, next) {
    let urlParam = req.body;
    query(urlParam, function (success) {
        if (success == null) {
            res.json({
                status: "400",
                data: '账号或者密码错误'
            });
        } else {
            res.json({
                status: "200",
                data: success
            });
        }

    })
});




router.get('/:id', function (req, res, next) {
    let urlParam = req.params.id;
 
  
    queryOne(urlParam, function (success) {
        if (success == null) {
            res.json({
                status: "400",
                data: 'id有误'
            });
        } else {
            res.json({
                status: "200",
                data: success
            });
        }

    })
});



router.post('/sign/new', function (req, res, next) {
    let urlParam = req.body;
   console.log(urlParam)

    findByName(urlParam, function (success) {
        if (success != null) {
            res.json({
                status: "400",
                data: '账号已经被用过了哦'
            });
        } else {

           
            add(urlParam, function (success) {
                if (success == null) {
                    res.json({
                        status: "400",
                        data: '操作失败'
                    });
                } else {
                    res.json({
                        status: "200",
                        data: success
                    });
                }
            })
        }
    })
});




module.exports = router;