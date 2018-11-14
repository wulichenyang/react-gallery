let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let finacialSchema = new Schema({
  "key": Number,
  "activity": String,
  "money": Number,
  "date": Date
});

module.exports = mongoose.model('Finacial', finacialSchema);