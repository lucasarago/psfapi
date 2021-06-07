'use strict'

var mongoose = require('mongoose');
const EntityKey = require('../models/entityKey');
const Param = require('../models/param');
var Schema = mongoose.Schema;

var EventSchema = Schema({
    eventId: String,
    entityType: String,
    effectiveStartDate: Date,
    publishedAt: Date,
    publishedBy: String,
    repost: Boolean,
    entityKeys: [ {name: String, value: String }],
    params: [ {name: String, value: String } ]
});

module.exports = mongoose.model('Event', EventSchema);