const winston = require('winston');
require('winston-mongodb');
require('express-async-errors'); //to remove all asyncMiddleware mess
const config = require('config');
// routes requirements cut and pasted to ../startup/routes.js
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

winston.add(winston.transports.File, { filename: 'logfile.log'});
// winston.add(winston.transports.MongoDB, {
//   db:'mongodb+srv://vinuadmin:vinu123@cluster0-lxhhh.mongodb.net/moshmovies?retryWrites=true&w=majority',
//   level:'info'});

  //uncaught exception
  // process.on('uncaughtException', (ex) =>{
  //   console.log('We got uncaught exception');
  //   winston.error(ex.message, ex);
  // });

  winston.handleExceptions(
    new winston.transports.File({filename: 'uncaughtException.log'})
  )
process.on('unhandledRejection', (ex)=>{
  // console.log('WE GOT AN UNHANDLED EXCEPTION');
  // winston.error(ex.message, ex);
  throw ex;
});
//uncaught testing
//throw new Error('Something failed during startup');

// unhandled Promes Rejections
const p= Promise.reject(new Error('Something failed miserably....'));
p.then(() => console.log('done...'));

if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey is not defined...');
  process.exit(1) // for failure exit(0) for success
}

//db conenction cut and pasted to startup/db.js

  //all routes cut and pasted to ../startup/routes.js
const port = process.env.PORT ||3333;
app.listen(port, () => console.log(`Listening on port ${port}...`));