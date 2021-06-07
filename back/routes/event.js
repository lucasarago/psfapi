'use strict'

var express = require('express');
var EventController = require('../controllers/event');
var api = express.Router();

api.post('/event', EventController.saveEvent);
api.get('/events', EventController.getEvents);
api.get('/event/:id', EventController.getEventById);
api.put('/event/:id', EventController.editEvent);
api.delete('/event/:id', EventController.deleteEvent);
api.get('/events/:id', EventController.getEventByIdFront);

module.exports = api;