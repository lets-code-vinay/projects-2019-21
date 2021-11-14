// import packages
import express from "express";
import morgan from "morgan";
import session from 'express-session';
import passport from "passport";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.resolve();


// passport config
import localStartegy from "./middlewares/passportValidation/passportLocal.js";
localStartegy(passport);

// connecting to databse
import "./database/mongodb.js";


// importing routing file
import userRoute from "./routes/user.route.js";
import homeRoute from "./routes/home.route.js";
import adminRoute from "./routes/admin.route.js";
import googleRoute from "./routes/google.route.js";
import askMeRoute from "./routes/askMe.route.js";
import blogRoute from "./routes/blog.route.js";
import faqRoute from "./routes/faqs.route.js";
import reviewRouter from "./routes/reviewRoutes.js";

// init
const app = express();


// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


// passport
app.use(passport.initialize());
app.use(passport.session());


// view engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');


// routing
app.use('/users', userRoute);
app.use('/admins', adminRoute);
app.use('/google', googleRoute);
app.use('/askMe', askMeRoute);
app.use('/faqs', faqRoute);
app.use('/blogs', blogRoute);
app.use('/', homeRoute);
app.use('/reviews', reviewRouter);


// 404 error
app.use((req, res, next) => {
    next(new Error("Path is not defined"));
});


// error handler
app.use((err, req, res, next) => {
    if(err.message == 'Path is not defined') return res.status(404).render('notFound');
    console.log(err)
    res.status(500).render('serverError');
});


// listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server is runnning on ${PORT}...`)); 
