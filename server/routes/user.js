let express = require('express')
let userRouter = express.Router()
let User = require('../models/user')
let jwt = require('jsonwebtoken')
let svgCaptcha = require('svg-captcha')
let session = require('express-session')

// 注册
userRouter.post('/signup', (req, res, next) => {
  const { username, password, captcha } = req.body
  // Check captcha
  if (!req.session.captcha) {// 验证码过期
    res.json({
      status: 1,
      msg: "验证码超时",
    })
    return
  }
  if (captcha === req.session.captcha) {
    User.find({ username }, (err, doc) => {
      if (err) {
        res.status(500).json({
          status: 1,
          msg: err.message,
        })
        return
      } else if (doc.length > 0) {
        res.json({
          status: 1,
          msg: "用户名已被注册"
        })
        return
      }
      // New user
      User.create({ username, password }, (err, doc) => {
        if (err) {
          res.status(500).json({
            status: 1,
            msg: err.message
          })
        } else {
          res.json({
            status: 0,
            msg: "注册成功， 请登录",
          })
        }
      })
    })
  } else {
    res.json({
      status: 1,
      msg: '验证码错误'
    })
  }
})

// 登录
userRouter.post('/signin', (req, res, next) => {
  const { username, password, captcha } = req.body

  // Check captcha
  if (!req.session.captcha) {// 验证码过期
    res.json({
      status: 1,
      msg: "验证码超时",
    })
    return
  }
  if (captcha === req.session.captcha) {
    // Check user
    User.findOne({ username, password }, (err, doc) => {
      if (err) {
        res.status(500).json({
          status: 1,
          msg: err.message,
        })
        return
      } else if (doc) { // 找到账号
        let content = { username }// 要生成token的主题信息
        let secretOrPrivateKey = 'secretOrPrivateKey'// 这是加密的key（密钥）
        let token = jwt.sign(content, secretOrPrivateKey, {
          expiresIn: 60 * 60 * 24  // 24小时过期
        })
        res.json({
          status: 0,
          msg: "登录成功",
          data: {
            token
          }
        })
        return
      } else { // 密码不正确
        res.send({
          status: 1,
          msg: '用户名或密码错误',
        });
      }
    })
  } else {
    res.json({
      status: 1,
      msg: '验证码错误'
    })
  }
})
// 验证码
userRouter.get('/captcha', (req, res, next) => {
  let captcha = svgCaptcha.create({
    // 验证码长度
    size: 4,
    // 翻转颜色
    // inverse: false,
    // 验证码字符中排除 0o1i
    ignoreChars: '0o1i',
    // 字体大小
    fontSize: 32,
    // 噪声线条数
    noise: 2,
    // 宽度
    width: 130,
    // 高度
    height: 32,
    // color: true,
  });
  // session 记录captcha
  req.session.captcha = captcha.text.toLowerCase();
  res.send({
    status: 0,
    msg: '验证码',
    data: {
      img: captcha.data
    }
  });
})

module.exports = userRouter;