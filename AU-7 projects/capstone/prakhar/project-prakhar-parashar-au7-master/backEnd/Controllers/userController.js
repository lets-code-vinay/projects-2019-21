import User from '../Models/User.js'

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

import Profile from '../Models/Profile.js'

import Posts from '../Models/Posts.js'

const controllers = {

    userRegistered: (req, res) => {
        const saltRounds = 10
        bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
            req.body.password = hashedPassword
            console.log(req.body)
            User.create(req.body)
                .then((user, err) => {
                    if (err) {
                        res.json({
                            status: 400,
                            message: "Mongodb Cannot create new user",
                            error: err
                        })
                    }
                    res.json({
                        status: 200,
                        message: "Registration Successful",
                        user: user
                    })
                }
                )

        })


    },


    logInPost: (req, res) => {
        console.log(req.body)
        User.findOne({ userName: req.body.userName }, (err, user) => {
            if (err) {
                res.json({ message: "User not found" })
            }
            if (!user) {
                res.json({ message: "User not found" })
            }
            else {

                console.log(req.body.password, user.password)
                bcrypt.compare(req.body.password, user.password, (err, result) => {

                    console.log(err)
                    if (err) {
                        console.log("heyyy")
                        res.json({ message: "password don't match" })
                    }
                    else if (result == true) {
                        const token = jwt.sign({ _id: user._id, userName: user.userName, profilePic: user.profilePic }, 'secret', (err, token) => {
                            User.findByIdAndUpdate(user._id, { token: token })
                                .then(res.json({
                                    message: "Login Successful",
                                    user: user,
                                    token: token
                                }))

                        })

                    }
                    else {
                        res.json({ message: "password don't match" })
                    }

                })
            }




        })
    },

    recievedProfileDetails: (req, res) => {
        console.log(req.body)
        Profile.create(req.body)
    },

    getProfile: async (req, res) => {
        const id = req.query.userId
        console.log(id)
        Posts.find({ user: id }).populate('user').exec(function(err,posts) {

            Profile.findOne({ userId: id }).populate('userId').exec(function (err, profileInfo) {

                if (err) {
                    console.log(err)
                    res.send(err)
                }
                console.log(posts, "hey")
    
                res.send({ profileInfo, posts })
            })

        })
        //console.log(id)
        
    },


    friendRequest: (req, res) => {

        User.findById(req.body.sender)
            .then(function (user) {
                console.log(user)
                const requestSender = { userName: user.userName, profilePic: user.profilePic, userId: user._id }
                User.update({ _id: req.body.reciever }, { $push: { recievedRequest: requestSender } })
                    .then(function (user) {

                        User.findById(req.body.reciever)
                            .then(function (user) {
                                console.log(user)
                                const requestReciever = { userName: user.userName, profilePic: user.profilePic, userId: user._id }
                                User.update({ _id: req.body.sender }, { $push: { sentRequest: requestReciever } })
                                    .then(function (user) {
                                    })

                            })
                    })

                res.send("hey")

            })
    },

    loggedInUserInfo: (req, res) => {
        User.findById(req.body.userId, (err, user) => {
            res.send(user)
        })
    },

    //    requestedFriendsInfo : (req, res) => {
    //        const requests = req.body.recievedRequest
    //        const usersRequested = []
    //        function dothis() {
    //            for (let i of requests) {
    //            User.findById(i, (err, user) => {
    //                 usersRequested.push(user)
    //            })
    //        }
    //     }

    //    },

    requestHandle: (req, res) => {
        console.log(req.body)
        if (req.body.request == "accept") {
            console.log('h')
            User.find({ _id: req.body.requestedUser }, (err, user) => {
                const newUser = {
                    userName : user[0].userName,
                    profilePic : user[0].profilePic,
                    userId : user[0]._id
                }
                console.log(user)
                User.update({ _id: req.body.currentUser }, { $pull: { recievedRequest: { userName: user[0].userName } }, $push: { friends: newUser } }, { multi: true })
                    .then(function (user) {

                        User.find({ _id: req.body.currentUser }, (err, user) => {
                            const newerUser = {
                                userName : user[0].userName,
                                profilePic : user[0].profilePic,
                                userId : user[0]._id
                            }
                            User.update({ _id: req.body.requestedUser }, { $pull: { sentRequest: { userName: user[0].userName } }, $push: { friends: newerUser } }, { multi: true })
                                .then(function (user) {

                                })

                        })
                    })

            })


        }


    },

    searchUser : (req, res) => {
        User.find({userName : req.body.userName}, (err, user) => {
            res.send(user)
        })
    }
}


    export default controllers

