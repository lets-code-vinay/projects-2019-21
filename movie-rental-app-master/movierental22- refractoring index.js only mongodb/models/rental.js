const Joi = require('joi');
const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://vinuadmin:vinu123@cluster0-lxhhh.mongodb.net/moshmovies?retryWrites=true&w=majority')
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch(err => console.error('Could not connect to MongoDB...', err));


const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
                    type:String,
                    required : true,
                    minlength: 5,
                    maxlength: 50
                },
                isGold: {
                    type: Boolean,
                    default: false
                },
                phone:{
                    type: Number,
                    trim: true,
                    required: true,
                    minlength: 3,
                    maxlength: 14
                    }
                }), 
                required:true,
            },
            movie:{
                type: new mongoose.Schema({
                    title: {
                        type:String,
                        requied: true,
                        trim: true,
                        minlength: 5,
                        maxlength: 40
                    },
                    dailyRentalRate:{
                        type:Number,
                        required: true,
                        min: 0, 
                        max: 255
                    }
                }),
                required: true
            },
            dateOut:{
                type: Date,
                required: true,
                default: Date.now
            },
            dateReturned: {
                type:Date
            },
            rentalFee:{
                type: Number,
                min: 0,
            }
}));
function validateRental(rental){
    const schema = {
        customerId: Joi.string().required(),
        movieId :Joi.string().required()
    };
    return Joi.validate(rental, schema)
}
exports.Rental = Rental;
exports.validate = validateRental;

// rental route part

// try{   //chances of error is more try catch block to find error
//     new Fawn.Task()
//     .save('rentals', rental) //working directly with collection, rentals is actual name of collection so keep attention, 2nd rental is new rental object
//     .update('movie',{__id:movie._id}, { $inc: {numberInStock: -1} }) //update movie by id and reduce numberinstock by 1
//     .run();  // to run above operation
    
//     res.send(rental)
//     console.log(rental)
//    }
//    catch(ex){
//        res.status(500) //

//    }