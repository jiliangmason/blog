/**
 * Created by Administrator on 2017/8/5 0005.
 */
module.exports = {
  checkLogin: function checkLogin(req, res, next) {
      if (!req.session.username) {
          req.flash('error', '未登陆'); //设置error的值为未登陆
          return res.redirect('/signin'); //重定向到登陆页面
      }
      next();  //跳到下一个中间件去执行
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
      if (req.session.username) {
          req.flash('error', '已经登陆');
          return res.redirect('back');  //返回之前的页面
      }
      next();
  }
};