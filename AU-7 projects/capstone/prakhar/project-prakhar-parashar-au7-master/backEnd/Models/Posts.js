import mongoose from 'mongoose'

const schema = mongoose.Schema

const postSchema = new schema ({
    
    
    postText : {
        type: String
    },

    assetId : {
        type : String
    },
    
    DateTime: {
        type : Date
    },

    user : {
        type : schema.Types.ObjectId,
        ref : 'User'
    },
    
    Comments : [{}],

    Likes : {
        type: Number,
        default : 0
    }

})

const Posts = mongoose.model('Posts', postSchema)

export  default Posts