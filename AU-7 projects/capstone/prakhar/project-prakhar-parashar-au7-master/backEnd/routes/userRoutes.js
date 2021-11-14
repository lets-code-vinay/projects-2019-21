import express from 'express'
import userControllers from '../Controllers/userController.js'
import postControllers from '../Controllers/postControllers.js'
import cors from 'cors'
import passport from 'passport'
import '../passport.js'


const Router = express()


Router.use(cors());
Router.options('*', cors());


// Router.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
//     next();
// });
//to check  if deployed on heroku 

Router.get('/', (req, res) => {
    res.send("done")
})


 
//User SignUp
Router.post('/userRegistration', userControllers.userRegistered)

//User Login
Router.post('/userLogin', userControllers.logInPost)

//Profile Details 
Router.post('/ProfileDetails', userControllers.recievedProfileDetails)

//To add a post
Router.post('/createPost',  postControllers.createPost)

// To view all posts
Router.get('/viewPosts', passport.authenticate('jwt', { session: false }), postControllers.viewPosts)

//To send profile Info 
Router.get('/getProfile', userControllers.getProfile)


//To comment on a post 
Router.post('/comment', postControllers.commentOnPost)

//To send a friend request
Router.post('/friendRequest', userControllers.friendRequest)

//To get LoggedIn userInfo
Router.post('/loggedInUserInfo', userControllers.loggedInUserInfo)


//To accept Reject request 
Router.post('/requestHandle', userControllers.requestHandle)

//To Like 
Router.post('/liked', postControllers.postLiked)

//To unlike
Router.post('/unliked', postControllers.postUnliked)

//search User
Router.post('/searchUser', userControllers.searchUser)

export default Router