let express = require('express')
let indexRouter = express.Router();
let finacialRouter = require('./finacial')
let userRouter = require('./user')

indexRouter.get('/', (req, res, next) => {
  res.send('index page')
})

module.exports = {
  indexRouter,
  finacialRouter,
  userRouter
};