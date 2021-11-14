import mongoose from 'mongoose'

const schema = mongoose.Schema

const profileDetailsSchema = new schema ({

    userId : {
        type : schema.Types.ObjectId,
        ref : 'User'
    },

    basicInfoValues : {
        type : Object
    },

    workAndEducationValues : {
        type : Object
    },

    otherDetailsValues : {
        type : Object
    }
})

const Profile = mongoose.model('Profile', profileDetailsSchema)

export  default Profile