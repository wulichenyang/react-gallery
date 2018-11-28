let express = require('express');
let finacialRouter = express.Router();
let Finacial = require('../models/finacial');

//查询金融表单数据
finacialRouter.get('/getAllFinacial', (req, res, next) => {
  let query = Finacial.find({})
  query.exec((err, doc) => {
    if (err) {
      res.status(500).json({
        status: 1,
        msg: err.message
      })
    } else {
      res.json({
        status: 0,
        msg: "Got finacial list",
        data: doc
      })
    }
  })
})

// 添加金融表单数据
finacialRouter.post('/addFinacial', (req, res, next) => {
  const newItem = req.body.finacialRow
  console.log(newItem)
  Finacial.insertMany(newItem, (err, doc) => {
    if (err) {
      res.status(500).json({
        status: 1,
        msg: err.message
      })
    } else {
      res.json({
        status: 0,
        msg: "Insert success",
        data: doc
      })
    }
  })
})

// 删除金融表单数据
finacialRouter.post('/delFinacial', (req, res, next) => {
  const id = req.body.id
  console.log(id)
  Finacial.deleteOne({ "_id": id }, (err, doc) => {
    if (err) {
      res.status(500).json({
        status: 1,
        msg: err.message
      })
    } else {
      res.json({
        status: 0,
        msg: "Delete success",
        data: doc
      })
    }
  })
})

// 修改金融表单数据
finacialRouter.put('/updateFinacial', (req, res, next) => {
  const id = req.body.id
  const { activity, money, date } = req.body
  console.log(date)
  Finacial.updateOne(
    { "_id": id },
    {
      $set: {
        activity,
        money,
        date
      }
    },
    (err, doc) => {
      if (err) {
        res.status(500).json({
          status: 1,
          msg: err.message
        })
      } else {
        res.json({
          status: 0,
          msg: "Update success",
          data: doc
        })
      }
    })
})

module.exports = finacialRouter;