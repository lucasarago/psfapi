'use strict'

var express = require('express');
var EmployeeController = require('../controllers/employee');
var api = express.Router();

api.get('/employees', EmployeeController.getEmployees);
api.get('/perPerson/:id', EmployeeController.getEmployeeById);
api.get('/perPerson/:id/:field', EmployeeController.getFieldByEmployeeId);
api.post('/perPerson', EmployeeController.saveEmployee);
api.post('/perPerson/batch', EmployeeController.saveEmployeesBatch);
api.put('/perPerson/:id', EmployeeController.updateEmployee);
api.delete('/perPerson/:id', EmployeeController.deleteEmployee);

module.exports = api;