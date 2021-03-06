var express = require('express')
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var routers = require('./routes/index');
var jwtauth = require('./middleware/jwtauth');
var router = express.Router();
// var finacial = require('./routes/finacial');
var logger = require('morgan');
var app = express()
var mongoose = require('mongoose');
const { 
  user,
  pwd,
  database,
  apiPrefix,
  sessionConf,
  corsConf,
} = require('./config')
const cors = require('cors')
const session = require('express-session');

// 连接本地mongodb数据库
mongoose.connect(`mongodb://${user}:${pwd}@127.0.0.1:27017/${database}`);

// 连接成功操作
mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
})

// 连接失败操作
mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
})

// 连接断开操作
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// // create application/json parser
// var jsonParser = bodyParser.json()
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session(sessionConf))
// cross-access
app.use(cors(corsConf))
// 身份验证
app.use(jwtauth)
// routers
app.use(routers.indexRouter)
app.use(routers.finacialRouter)
app.use(routers.userRouter)
// Add api prefix
Object.keys(routers).map(key => {
  app.use(apiPrefix, routers[key])
})

// wrong route => catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  err.status ? res.render('notFound')
    : res.render('internalError')
});

module.exports = app;