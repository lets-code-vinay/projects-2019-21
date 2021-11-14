 const Joi = require('joi')
 const mongoose = require('mongoose');
 const {genreSchema} = require('./genre')

//  mongoose.connect('mongodb+srv://vinuadmin:vinu123@cluster0-lxhhh.mongodb.net/moshmovies?retryWrites=true&w=majority')
//  .then(() => console.log('Connected to MongoDB...'))
//  .catch(err => console.error('Could not connect to MongoDB...', err));

const Movie = mongoose.model('Movies', new mongoose.Schema({ 
    title:{
        type: String,
        required: true,
        minlength:3,
        maxlength: 40,
        trim: true
    },
    genre:{
        type:genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255    
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));
//validation
function validateMovie(movie){
    const schema ={
        title:Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie,schema);
}
exports.Movie= Movie;
exports.validate= validateMovie;