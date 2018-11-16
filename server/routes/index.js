let express = require('express')
let indexRouter = express.Router();
let finacialRouter = require('./finacial')
let { apiPrefix } = require('../config')

indexRouter.get(`${apiPrefix}/`, (req, res, next) => {
  res.send('index page')
})

module.exports = {
  indexRouter,
  finacialRouter
};