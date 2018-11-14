let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('@models/finacial');

//链接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/finacial');

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected success")
});
mongoose.connection.on("error", () => {
    console.log("MongoDB connected fail")
});
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connected disconnected")
});
//查询商品列表数据
router.get('/finacial', (req, res, next) => {