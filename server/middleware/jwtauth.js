let jwt = require('jsonwebtoken')
// 自定义 验证用户token 中间件
module.exports = (req, res, next) => {
  // 定义 不用token 的api
  if (req.originalUrl.indexOf('/signin') >= 0 || req.originalUrl.indexOf('/signup') >= 0) {
    return next();
  }
  //定义 用token的api对其验证
  let token = req.body.token || req.query.token || req.headers["x-access-token"];
  console.log("hehehehe:" + req.originalUrl)
  jwt.verify(token, "secretOrPrivateKey", (err, decoded) => {
    if (err) {
      // token验证失败
      res.status(401).send({
        status: 1,
        msg: '未登录或登录超时'
      });
      return;
    } else {
      // token验证成功 跳出中间件
      return next();
    }
  });
};