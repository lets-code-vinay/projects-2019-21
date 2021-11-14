const express = require('express');
const router = express.Router();
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const resizeImg = require('resize-img');

// Get Product model
var Product = require('../models/products');

// Get Category model
var Category = require('../models/category');

//_______________________________________________
//Get products index
router.get('/', (req, res)=>{
      var count;
     Product.count(function(err, c){
         count = c;
     })
     Product.find(function(err, products){
         res.render('admin/products', {
             products: products,
             count: count
         });
     });
});

//___________________________________________
// GEt add Product
router.get('/add-product', (req, res)=>{
    var title = '';   //variables to pass in the view
    var desc= '';
    var price= '';

    Category.find(function(err, categories){   //finding product inside the respective category
        res.render('admin/add_product',{  // will render in views/admin/add_page with variables
            title: title,
            image: image,
            desc: desc,
            categories: categories,
            price: price
        });
    
    })
}); 
//Posting add_product form
router.post('/add-product', (req, res)=>{
            var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";

    //validate the content
    req.checkBody('title', 'Title must have a value').notEmpty();
    req.checkBody('description', 'Description must have a value').notEmpty();
    req.checkBody('price', 'Price must have a value').isDecimal();
    req.checkBody('image', 'you must upload an image').isImage(imageFile);

    //Get data from form inputs
    var title = req.body.title;    
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var desc = req.body.desc;
    var price = req.body.price;
    var category = req.body.category;

    //validate errors
    var errors = req.validationErrors();

    if(errors){
        Category.find(function(err, categories) {
            res.render('admin/add_product',{
                errors: errors,
                title: title,
                desc : desc,
                categories: categories,
                price: price
            });
        });
        console.log(errors)
    } //if no errors
    else{
         Product.findOne({slug: slug}, (err, product)=>{
            if(product) {
                req.flash('danger', "product title exist, choose another");
            Category.find(function (err, categories){
                res.render('admin/add_product',{
                    title: title,
                    desc: desc,
                    categories: categories,
                    price: price
                });
              });
            } else{
                var price2 = parseFloat(price).toFixed(2);  // converting in decimal with 2 place value
                    var product = new Product({
                        title: title,
                        slug: slug,
                        desc: desc,
                        price: price2,
                        category: category,
                        image: imageFile
                    });

                    product.save(function(err){
                        if(err) return console.log(err);

                        mkdirp('public/product_images/'+product._id, function(err){ // will create new folder with product id name
                            return console.log(err);
                        })
                            //Creating folder inside folder for gallery images 
                        mkdirp('public/product_images/'+product._id +'/gallery', function(err){ // will create new folder with product id name
                            return console.log(err);
                        })
                            //Creating folder inside the folder for gallery images and thumbnails
                        mkdirp('public/product_images/'+product._id + 'gallery/thumbs', function(err){ // will create new folder with product id name
                            return console.log(err);
                        })
                //if image file is not empty string
                        if(imageFile != ""){
                            var productImage = req.files.image;
                            var path = 'public/product_image' + product._id + '/' + imageFile;

                            productImage.mv(path, function (err){ //mv = method/function
                                return console.log(err);
                            })
                        }
                        req.flash('Success', 'Product added!');
                        console.log('success')
                        res.redirect('/admin/products');
                    });
            }
        })
    }
});

//Post reordered pages
router.post('/reorder-pages', (req, res)=>{
    //console.log(req.body);
    var ids= req.body['id[]'];
    var count = 0;
    for(var i=0; i<ids.length ; i++){
        var id = ids[i];
        count++;
       
  //in serial order
  (function(){
    Page.findById(id, function(err, page){
        page.sorting = count;
        page.save(function(err){
            if(err)
            return console.log(err);
        })
    })
  }) (count)     
      
    }
})

//_____________________________________________________
//Get edit page
// router.get('/edit-page/:slug', (req, res)=>{
//     Page.findOne({slug: req.params.slug}, function(err, page){
    router.get('/edit-page/:id', (req, res)=>{
        Page.findById(req.params.id, function(err, page){
    
        if(err)
        return console.log(err);

        res.render('admin/edit_page', {
            title: page.title,
            slug: page.slug,
            content: page.content,
            id: page._id
        })
    })
})

//Post edit page
//router.post('/edit-page/:slug', function(req, res){
    router.post('/edit-page/:id', function(req, res){
    req.checkBody('title', 'Titlemust have a value.').notEmpty();
    req.checkBody('content', 'content must have a value..').notEmpty();

    var title = req.body.title;
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if(slug == "")
        slug = title.replace(/\s+/g).toLowerCase();
     var content = req.body.content;
     //var id = req.body.id;
     var id = req.params.id;

    var errors = req.validationErrors();

    if(errors){
        res.render('admin/edit_page', {
            errors: errors,
            title: title,
            slug: slug,
            content: content,
            id: id
        });
    } else {
        Page.findOne({slug:slug, _id:{'$ne':id}}, function(err, page){

            if(page){
                req.flash('danger', 'Page slug exists, choose another');
                res.render('admin/add_page', {
                 title: title,
                 slug: slug,
                 content: content 
                })
            } 
            else {
                Page.findById(id, function(err, page){
                    if(err)
                    return console.log(err);

                page.title= title;
                page.slug = slug;
                page.content = content;

                page.save(function(err){
                    if(err)
                    return console.log(err);

                    req.flash('success', 'Page edited');
                    //res.redirect('/admin/pages/'+page.slug);
                    res.redirect('/admin/pages');
                })
                });   
            }
        })
        }
    })
//______________________________________________________

//Get Delete page
router.get('/delete-page/:id', function(req, res){
    Page.findByIdAndRemove(req.params.id, function(err){
        if(err) return console.log(err);

        req.flash('success','Page deleted');
        res.redirect('/admin/pages')
    })
})

    //exports
module.exports = router;

 