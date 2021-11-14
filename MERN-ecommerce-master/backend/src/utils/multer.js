const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null, path.join(path.dirname(__dirname),'uploads'))
        
    },
    filename:function(req, file, cb){
        //cb(null, file.filename + '-' + Date.now()) //old method for file naming
        cb(null, shortid.generate()+ '-' + file.originalname)
    }
})
const upload = multer({ storage })

module.exports = upload;