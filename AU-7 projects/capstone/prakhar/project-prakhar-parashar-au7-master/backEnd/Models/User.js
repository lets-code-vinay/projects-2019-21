import mongoose from 'mongoose'

const schema = mongoose.Schema

const userSchema = new schema ({
    
    email : {
        type : String,
        unique: true,
        required : true
    },

    userName : {
        type : String,
        unique : true,
        required : true
    },

    password : {
        type : String||Number,
        required : true
    },
    profilePic :{
        type : String
    },
    token : {
        type : String
    },

    sentRequest : [{}],

    recievedRequest : [{}],

    friends : [{}]
})

const User = mongoose.model('User', userSchema)

export  default User