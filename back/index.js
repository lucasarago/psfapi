
'use strict'

const mongoose = require('mongoose')
const port = process.env.PORT || 80;
const app = require('./app');

const Event = require('./models/event');
const EntityKey = require('./models/entityKey');

mongoose.connect('mongodb://localhost:27017/ssf', (err, res) => {
    if (err) {
        return console.log(`Error in the DB: ${err}`);
    } else {
        console.log('DB connection established');
        app.listen(port, () => {
            console.log(`API REST running on: ${port}`)
        });
    }
});


