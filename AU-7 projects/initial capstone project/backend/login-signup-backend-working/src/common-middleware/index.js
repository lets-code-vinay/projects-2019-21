
exports.requireSignin = (req, res, next) =>{
    //use in postman ==> Headers -> add new key/value --> Authorization --> Bearer paste tokem
    const token = req.headers.authorization.split(" ")[1];
    console.log('looking for token',token)
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
    //jwt.decode()
}




