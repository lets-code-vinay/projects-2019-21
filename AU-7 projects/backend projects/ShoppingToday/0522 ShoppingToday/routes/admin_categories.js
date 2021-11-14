const express = require('express');
const router = express.Router();

// Get Category model
var Category = require('../models/category');


//Get categories index
router.get('/', (req, res)=>{
    //res.send('admin Category area')
     Category.find(function(err, categories){
         if(err) return console.log(err);
         res.render('admin/categories', {
             categories:categories
         });
    });
})
//__________________________________________________
//add Category
router.get('/add-category', (req, res)=>{
    var title = ''

    res.render('admin/add_category',{  // will render in views/admin/category_page with variables
        title: title
    });
}); 
//Posting add_Category form
router.post('/add-category', (req, res)=>{
    //validate the content
    req.checkBody('title', 'Title must have a value').notEmpty();
    
    //Get data from form inputs
    var title = req.body.title;    //.replace(/\s+/g, '-') replacing space with '-'
    var slug = title.replace(/\s+/g, '-').toLowerCase();
        
    //validate errors
    var errors = req.validationErrors();

    if(errors){
               res.render('admin/add_category',{  // will render in views/admin/add_page with variables
            errors: errors,
            title: title

        });
        console.log(errors)
    } //if no errors
    else{

         Category.findOne({slug: slug}, (err, category)=>{
            if(category) {
                req.flash('danger', "Category slug exist, choose another");
                res.render('admin/add_category',{
                    title: title
                });
            } else{
                    var category = new Category({
                        title: title,
                        slug: slug
                  });

                    category.save(function(err){
                        if(err) return console.log(err);

                        req.flash('Success', 'category added!');
                        console.log('success')
                        res.redirect('/admin/categories');
                    });
            }
        })
    }
});
//____________________________________________________________________
//_____________________________________________________
//Get edit Category
router.get('/edit-category/:id', (req, res)=>{
    Category.findById(req.params.id, function(err, category){
        if(err)
        return console.log(err);

        res.render('admin/edit_category', {
            title: category.title,
            id: category._id
        });
    })
})

//Post edit Category
router.post('/edit-category/:id', function(req, res){
    req.checkBody('title', 'Titlemust have a value.').notEmpty();
    
    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var id = req.params.id;

    var errors = req.validationErrors();

    if(errors){
        res.render('admin/edit_category', {
            errors: errors,
            title: title,
            id: id
        });
    } else {
        Category.findOne({slug:slug, _id:{'$ne':id}}, function(err, category){

            if(category){
                req.flash('danger', 'Category Title exists, choose another');
                res.render('admin/add_category', {
                 title: title,
                 id: id
                });
            }   else {
                Category.findById(id, function(err, category){
                    if(err)
                    return console.log(err);

                category.title= title;
                category.slug = slug;
                category.save(function(err){
                    if(err)
                    return console.log(err);

                    req.flash('success', 'Category edited');
                    //res.redirect('/admin/pages/'+page.slug);
                    res.redirect('/admin/categories');
                })
                });   
            }
        })
        }
    })
//______________________________________________________

//Get Delete category
router.get('/delete-category/:id', function(req, res){
    Category.findByIdAndRemove(req.params.id, function(err){
        if(err) return console.log(err);

        req.flash('success','Category deleted');
        res.redirect('/admin/categories')
    })
})

    //exports
module.exports = router;

 