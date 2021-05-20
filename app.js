'use strict'

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

var employeeRoutes = require('./routes/employee');
var eventRoutes = require('./routes/event')

app.use('/api/v1', employeeRoutes);
app.use('/api/v1', eventRoutes);
app.use('/', (req, res) => {
    res.status(200).send({ message: `API v2 PSF V1 is OnLine` })
})

module.exports = app;