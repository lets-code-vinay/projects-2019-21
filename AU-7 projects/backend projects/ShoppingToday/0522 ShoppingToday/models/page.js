const mongoose = require('mongoose')

//Page schema
const PageSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    sorting:{
        type:Number,
        }
})

const page = module.exports = mongoose.model('Page', PageSchema);