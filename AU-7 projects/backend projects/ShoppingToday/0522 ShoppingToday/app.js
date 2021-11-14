const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const session = require('express-session')
// Connecting MongDb
const mongodb = require('./mongodb')
const expressValidator = require('express-validator')
const flash = require('flash');

const fileUpload = require('express-fileupload')



//init appp
const app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set public folders

app.use(express.static(path.join(__dirname, 'public')));

//Express fileUplaod midlleware
app.use(fileUpload());

//body parser middleware
//parse applciation/x-form0urlencoded
app.use(bodyParser.urlencoded({extended:true}))
    //pasrse application.json
app.use(bodyParser.json());

//Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

app.use(flash());


//Set global error variable
app.locals.errors = null;

//Express validator middleware
app.use(expressValidator({
    errorFormatter: function(param,msg,value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam +='[' + namespace.shift() +']';
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        };
    },
//Validationg image
    customValidators:{
        isImage:function(value, filename){
            var extension = (path.extname(file)).toLowerCase();
                switch(extension){
                    case 'jpg':
                        return '.jpg';
                    case 'jpeg':
                        return '.jpeg';
                    case 'png':
                        return '.png';
                    case '':
                        return '.jpg';
                    default :
                        return false
                }
        }
    }
}));
//Express messages midlleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


//Setting routers
const pages = require('./routes/pages');
const adminPages = require('./routes/admin_pages.js');
const adminCategories = require('./routes/admin_categories.js');
const adminProducts = require('./routes/admin_products.js');

app.use('/admin/pages', adminPages);
app.use('/admin/categories', adminCategories);
app.use('/admin/products', adminProducts);
app.use('/', pages)

//Start the server
const port = process.env.PORT||1212;
app.listen(port, () => console.log(`____on port: ${port}`))
