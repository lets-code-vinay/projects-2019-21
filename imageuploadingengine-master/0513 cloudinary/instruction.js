//npm i express multer body-parser dotenv
//npm i cloudinary
//multer will upload images to local which can be uplaoded to server later
// set up cloudinary
//dotenv save credentials
// Create .env file for sensitive information
//Create a new directory upload

_________________________________________________________
//____Multer setup______________
// create multer.js
    //load multer --> const multer = require('multer');

        //// Specify the storage
    // const storage = multer.distStorage({
    //     destination: function(req, file,cb){
    //         cb(null, './uploads/')
    //     },
    //     filename:function(req, file,cb){ //specifying the unique name of anyfile
    //         cb(null,Datenow().toISOString() + '-' + file.originalname) 
    //     }
    // })

    ////file Validation
    // const fileFilter= (req, file, cb)=>{ //mimetype specify the file type
    //     if(file.mimetye === 'image/jpeg'|| file.mimetype ==='image/png'){
    //         cb(null, true)
    //     }
    //     else{
    //         //prevent the upload
    //         cb({message: 'unsupported file format'}, false)
    //     }
    // })
    //// uploading file
    // const uipload = multer({
    //     storage: storage,  //get from cosnt storage
    //     limits :{fileSize: 1024 * 1024} ,  //Specifying the size limits of any image
    //     fileFilter: fileFilter // get from const fileFilter
    // })

    ////export it 
    //module.exports= upload
_________________________________________________________
//____Cloudinary setup______________
    ////load packages
    //const cloadinary = require('cloudinary')
    //  const dotenv = require('dotenv');
    //  dotenv.config()

    //  cloudinary.config({
    //      cloud_name: process.env.cloud_name,  //get the secret name from .env
    //      api_key: process.env.api_key,  //get the secret api ker from .env
    //      api_secret: process.env.api_secret,  //get the secret api secret from .env

    //  })
    //  //Function to uplaod files
    //  exports.uploads = (file, folder)=>{  
    //      return new Promise(resolve =>{
    //          cloudinary.uploader.upload(file,(result)=>{  // first argument is file to be uploaded, 2nd is result
    //             resolve({
    //                 url:result({
    //                     url: result.url, //actual url
    //                     id: result.public_id  //actual id
    //                 })
    //             },{
    //                 rsource_type:"auto",
    //                 folder:folder  //which folder is passing(uploads)
    //             })
    //          })  
 
    //      })
    //  }
      
//Export to server.js

// const multer = require('multer');
// const upload = multer();




////uploading image
//while uploading make sure the name should be as per parameter in upload.array('image')