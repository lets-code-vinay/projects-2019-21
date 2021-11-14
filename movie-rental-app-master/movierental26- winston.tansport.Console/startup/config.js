const config = require('config');

module.exports= function(){

if(!config.get('jwtPrivateKey')){
    // console.error('FATAL ERROR: jwtPrivateKey is not defined...');
    // process.exit(1) // for failure exit(0) for success
    throw new Error('FATAL ERROR, jwtPrivateKey is not defined...');
}
  
}