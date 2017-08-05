/**
 * Created by Administrator on 2017/8/5 0005.
 */
var express = require('express');
var router = express().Router;

var checkLogin = require('../middlewares/check').checkLogin;  //判断没有登陆过

// GET /signout 登出
router.get('/', checkLogin, function (req, res, next) {
    res.send(req.flash())
});


module.exports = router;