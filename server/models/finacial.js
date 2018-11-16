let mongoose = require('mongoose');
let finacialSchema = require('../schema/finacial');

module.exports = mongoose.model('Finacial', finacialSchema);