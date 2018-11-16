let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let finacialSchema = new Schema({
  "activity": String,
  "date": Date,
  "money": Number
});

module.exports = finacialSchema