/**
 * Created by Administrator on 2017/8/5 0005.
 */
let express = require('express');
let router = express().Router;

let checkLogin = require('../middlewares/check').checkLogin;  //判断没有登陆过

// GET /signout 登出
router.get('/', checkLogin, function (req, res, next) {
    res.send(req.flash())
});


module.exports = router;