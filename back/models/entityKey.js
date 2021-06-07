'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntityKeySchema = Schema({
    name: String,
    value: String 
});

module.exports = mongoose.model('EntityKey', EntityKeySchema);