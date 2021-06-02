var express = require('express');
var router = express.Router();
let { queryAll } = require("../dao/game.js"); // 数据库操作


router.get('', function (req, res) {
    let urlParam = req.body;
    queryAll(urlParam, function (success) {
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
});










module.exports = router;