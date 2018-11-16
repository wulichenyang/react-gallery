let express = require('express')
let indexRouter = express.Router();
let finacialRouter = require('./finacial')

indexRouter.get('/', (req, res, next) => {
  res.send('index page')
})

module.exports = {
  indexRouter,
  finacialRouter
};