'use strict'

var express = require('express');
var EventController = require('../controllers/event');
var api = express.Router();

api.post('/event', EventController.saveEvent);
api.get('/events', EventController.getEvents);
api.get('/event/:id', EventController.getEventById);

module.exports = api;