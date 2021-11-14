const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) =>{
    if(req.headers.authorization){
        //use in postman ==> Headers -> add new key/value --> Authorization --> Bearer paste tokem
    const token = req.headers.authorization.split(" ")[1];
    console.log('looking for token',token)
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    }
    else{
        return res.status(400).json({message:"Authorization required"})
    }
    next();
    //jwt.decode()
}

exports.userMiddleware = (req, res,next) =>{
        if(req.user.role !== 'user'){
            return res.status(400).json({message:"User access denied"})
        }
        next();
}


exports.adminMiddleware = (req, res, next) =>{
    if(req.user.role !== "admin"){
        console.log('admin checking', req.user.role)
        console.log('admin checking', req.user)
        return res.status(400).json({message:'Admin Access denied'})
    }
    next();
}
