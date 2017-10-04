/**
 * Created by Administrator on 2017/8/5 0005.
 */
let express = require('express');
let router = express.Router();

let checkNotLogin = require('../middlewares/check').checkNotLogin; //判断是否已经登陆，若已经登陆就跳转到之前的页面

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
    res.send(req.flash())
});

// POST /signin 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
    res.send(req.flash())
});

module.exports = router;