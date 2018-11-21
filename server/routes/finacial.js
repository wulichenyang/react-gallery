let express = require('express');
let finacialRouter = express.Router();
let Finacial = require('../models/finacial');

//  // insert
//   let finacial = new Finacial({
//     activity: "shopping",
//     date: new Date(),
//     money: 2000
//   })
//   finacial.save((err, doc) => {
//     if(err) {
//       console.log('err')
//     } else {
//       console.log(doc)
//     }
//   })

//查询金融表单数据
finacialRouter.get('/getAllFinacial', (req, res, next) => {
  let query = Finacial.find({})
  query.exec((err, doc) => {
    if (err) {
      res.json({
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
  const arr = [req.body]
  Finacial.insertMany(arr, (err, doc) => {
    if (err) {
      res.json({
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

module.exports = finacialRouter;