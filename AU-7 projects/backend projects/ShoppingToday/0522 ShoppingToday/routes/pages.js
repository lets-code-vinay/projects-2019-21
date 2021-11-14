const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    //res.send('test page')
    res.render('index', {title: 'Homepage'})
})


//exports
module.exports = router;


