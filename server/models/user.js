let mongoose = require('mongoose');
let userSchema = require('../schema/user');

module.exports = mongoose.model('User', userSchema);