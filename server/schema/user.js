let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  "username": String,
  "password": String,
  // "email": String,
  // "phone": String,
  // "avatar": String,

});

module.exports = userSchema