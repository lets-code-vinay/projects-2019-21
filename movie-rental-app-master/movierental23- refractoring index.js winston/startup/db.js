const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb+srv://vinuadmin:vinu123@cluster0-lxhhh.mongodb.net/moshmovies?retryWrites=true&w=majority')
//  .then(() => console.log('Connected to MongoDB...'))
  //.catch(err => console.error('Could not connect to MongoDB...', err));

  .then(() => winston.info('Connected to MongoDB...'))
}