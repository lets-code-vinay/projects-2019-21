const auth = require('../middleware/auth');  //import auth.js middleware
const {Movie,validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
    console.log(movies);
});

router.post('/',auth, async (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre..');

    let movie = new Movie({
            title: req.body.title,
            genre:{
                _id: genre._id,
                name: genre.name
            },
            numberInStock : req.body.numberInStock,
            dailyRentalRate : req.body.dailyRentalRate
    });
    // for post rqst {     "title":"Jumanji",
    //     "genreId":"5ea3a8b85afc9431f43fc685",
    //     "numberInStock": 2,
    //     "dailyRentalRate": 15 }
    movie = await movie.save()
    res.send(movie);
    console.log(movie);
});
router.put('./:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre...');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {new: true});

    if (!movie) return res.status(404).send('The movie with the given ID was not found..')
    res.send(movie);
    console.log(movie)
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if(!movie) return res.status(404).send('The movie with the given Id not found');
    res.send(movie);
    console.log(movie +'deleted.............')
});
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if(!movie) return res.status(404).send('The movie with given id was not found..')
    res.send(movie);
    console.log(movie)

})
module.exports = router;
