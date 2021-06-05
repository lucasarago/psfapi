'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = Schema({
    eventId: String,
    entityType: String,
    effectiveStartDate: Date,
    publishedAt: Date,
    publishedBy: String,
    repost: Boolean,
    entityKeys: { type: Array, default: []},
    params: { type: Array, default: []}
});

module.exports = mongoose.model('Event', EventSchema);