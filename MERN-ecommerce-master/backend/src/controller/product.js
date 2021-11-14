const Product = require('../models/product')
const slugify = require('slugify');

exports.createProduct =((req, res) =>{


    //    //for single image
// //    res.status(200).json({ file:req.file, body:req.body, message:"Body checking"})
   
//     //for multiple images
//     res.status(200).json({ file:req.files, body:req.body, message:"Body checking"})
   
//     console.log('req.file is----', req.file)
//     console.log('req.files is----', req.files)
//     console.log('req.bisy is---', req.body)

const {
    name, price, description, category, quantity, createdBy
} = req.body

let productPictures = [];

if(req.files.length > 0 ){
    productPictures = req.files.map(file => {
        return { img : file.filename }
    });
}

const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    quantity,
    productPictures,
    category,
    createdBy: req.user._id
})
product.save(
    ((error, product) => {
        if(error) return res.status(400).json({error})
        if(product){
            res.status(201).json({ product })
        }
    })
)

})