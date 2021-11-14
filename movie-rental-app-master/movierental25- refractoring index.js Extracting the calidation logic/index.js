//express-async-errors cut and pasted to ../startup/logging.js
//config cut and pasted to startup/config.js
// routes requirements cut and pasted to ../startup/routes.js
// mongodb connection cut and pasted to../startup/db.js
//wisntons requirements cut and pasted to startup/logging.js

//Joi cut and pasted to ../startup/validation
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging'); 
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

//winston stuffs pasted to startup/db.js

//config and jwtprivatekey is shifted to startup/config.js

//cut pasted mongoDB to startup/db.js

  //all routes cut and pasted to ../startup/routes.js
const port = process.env.PORT ||3333;
app.listen(port, () => winston.info(`Listening on port ${port}...`));