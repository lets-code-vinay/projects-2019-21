// chances in jwt, beccause i tried to authenticate in post it throws error of invalid email and password with right credentials

//FATAL ERROR: jwtPrivateKey is not defined :- can be reslve using
//Fixed --> export vidly_jwtPrivatKey=anythinghere  -- without space

// TypeError: user.generateAuthToken is not a function at router.post  mongoose/routes/users.js:39:24)
//FIXED-- Typo error

//Access denied while using 