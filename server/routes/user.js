let express = require('express');
let userRouter = express.Router();
let User = require('../models/user');
let jwt = require('jsonwebtoken')
// 注册
userRouter.post('/signup', (req, res, next) => {
  const { username, password } = req.body.user
  console.log(user)
  User.find({ username }, (err, doc) => {
    if (err) {
      res.status(500).json({
        status: 1,
        msg: err.message,
      })
    } else if (doc) {
      res.json({
        status: 1,
        msg: "用户名已被注册"
      })
    }
    // New user
    User.create(user, (err, doc) => {
      if (err) {
        res.status(500).json({
          status: 1,
          msg: err.message
        })
      } else {
        res.json({
          status: 0,
          msg: "注册成功",
        })
      }
    })
  })
})

// 登录
userRouter.post('/signin', (req, res, next) => {
  const { username, password } = req.body.user
  User.find({ username, password }, (err, doc) => {
    if (err) {
      res.status(500).json({
        status: 1,
        msg: err.message,
      })
    } else if (doc) {
      let content = { username }// 要生成token的主题信息
      let secretOrPrivateKey = 'secretOrPrivateKey'// 这是加密的key（密钥）
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 0.02  // 0.0.2小时过期
      })
      res.json({
        status: 1,
        msg: "登录成功",
        data: {
          token
        }
      })
    } else {
      res.send({
        status: 1,
        msg: '用户名或密码错误',
      });
    }

  })
})

module.exports = userRouter;