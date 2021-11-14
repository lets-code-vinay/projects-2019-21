const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true,
        trim: true
    },
    slug:{
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true
    },
    price:{
        type:Number,
        required: true
    },
    description:{
        type:String,
        required: true,
        trim:true
    },
    quantity:{
        type:Number,
        required:true
    },
    offer:{
        type:Number
    },
    productPictures:[
        {
            img:{ type:String}
        }
    ],
    reviews:[
        {
            userId:{
                type : mongoose.Schema.Types.ObjectId,
                ref:"User"},
                review:String
        }
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required: true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    updatedAt:Date,

}, {timestamps:true});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);