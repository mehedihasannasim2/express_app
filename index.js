require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const users = require('./routes/users');
const auth = require('./routes/auth');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const { Rental } = require('./models/rental');
const app = express();


winston.add(winston.transports.File, {filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/genre_DB',
    
 });

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not define...');
    process.exit(1);
}


mongoose.connect('mongodb://localhost/genre_DB')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB'));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..!!`)); 