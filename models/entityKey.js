'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntityKeySchema = Schema({
    seqNumber: Number,
    userId: String,
    startDate: Date,
    personIdExternal: String,
    positionCode: String,
    managerId: String
});

module.exports = mongoose.model('EntityKey', EntityKeySchema);