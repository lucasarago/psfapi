'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParamSchema = Schema({
    name: String,
    value: String 
});

module.exports = mongoose.model('Param', ParamSchema);