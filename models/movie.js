const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');


const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateCustomer(movie) {
    const schema = Joi.object({
        title : Joi.string().min(5).max(50).required(),
        genreId : Joi.objectId().required(),
        numberInStock : Joi.number().min().required(),
        dailyRentalRate: Joi.number().min().required()
    });
    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateCustomer;

