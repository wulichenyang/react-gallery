// api prefix config
const apiPrefix = '/gallery-api-v1'

// mongodb config
const user = 'test'
const pwd = 'test'
const database = 'gallery'

// session config
const sessionConf = {
  //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  name: 'captcha',
  secret: 'minamo-hoho', // 用来对session id相关的cookie进行签名
  // store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  cookie: {
    maxAge: 60 * 1000  // 有效期，单位是毫秒
  },
  sercure: true,
  //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
  resave: false, // 是否每次都重新保存会话，建议false
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
}

// cors config
const corsConf = {
  origin: [
    'http://localhost:3838',
    'http://192.168.1.167:3838',
  ],
  // origin: '*',
  credentials: true
}

module.exports = {
  user,
  pwd,
  database,
  apiPrefix,
  sessionConf,
  corsConf,
}