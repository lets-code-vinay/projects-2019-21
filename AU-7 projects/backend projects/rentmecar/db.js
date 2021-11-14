const mongoose = require('mongoose');
const {MONGODB_URI, MONGODB_PASSWORD} = process.env;


mongoose.connect(MONGODB_URI,{
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useCreateIndex : true
})
.then(()=> console.log('---successfully connected to database ----'))
.catch( (err)=> console.log('--Alas!!! unable to connect with db----'))
