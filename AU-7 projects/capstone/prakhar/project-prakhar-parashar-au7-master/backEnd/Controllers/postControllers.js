import Posts from '../Models/Posts.js'
import jwt from 'jsonwebtoken'
import Users from '../Models/User.js'




const controllers = {


    viewPosts: (req, res) => {
        console.log("here")
        Posts.find().populate('user').exec(function (err, posts) {
            res.send(posts)
        })



    },

    postLiked: (req, res) => {
        const postId = req.body.post
        Posts.update({ _id: postId }, { $inc: { Likes: 1 } }, (err, post) => {
            if (err) { res.send(err) }
            res.send("Liked Successfully")
        })

    },


    postUnliked: (req, res) => {
        const postId = req.body.post
        Posts.update({ _id: postId }, { $inc: { Likes: -1 } }, (err, post) => {
            if (err) { res.send(err) }
            res.send("unliked Successfully")
        })

    },

    commentOnPost: (req, res) => {

        console.log(req.body)


        Posts.update({ _id: req.body.post }, {
            $push: {
                Comments: req.body
            }

        }).then(() => {
            Posts.find().populate('user').exec(function (err, posts) {
                res.send(posts)
            })
        })
    },

    createPost: (req, res) => {

        const date = new Date()
        req.body.DateTime = date
        console.log(req.body)
        Posts.create(req.body).then((post, err) => {
            if (err) {
                console.log(err)
                res.json({
                    status: 400,
                    message: "Mongodb Cannot create new post",
                    error: err
                })
            }
            console.log(post)
            Posts.findById(post._id).populate('user').exec(function (err, post) {
                if (err) return err
                console.log(post.user)
            })
            res.json({
                status: 200,
                message: "Post created Successfully",
                post: post
            })
        })

    }

}


export default controllers