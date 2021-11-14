const express = require('express');
const router = express.Router();

// Get Page model
var Page = require('../models/page');


//Get pages index
router.get('/', (req, res)=>{
    //res.send('admin area')
     Page.find({}).sort({sorting:1}).exec(function(err, pages){
            res.render('admin/pages',{
                pages: pages
            });
    });
});


//add page
router.get('/add-page', (req, res)=>{
    var title = '';   //variables to pass in the view
    var slug= '';
    var content = '';

    res.render('admin/add_page',{  // will render in views/admin/add_page with variables
        title: title,
        slug: slug,
        content: content
    });
}); 
//Posting ass_pageform
router.post('/add-page', (req, res)=>{
    //validate the content
    req.checkBody('title', 'Title must have a value').notEmpty();
    req.checkBody('content', 'Content must have a value').notEmpty();
    
    //Get dat from form inputs
    var title = req.body.title;    //.replace(/\s+/g, '-') replacing space with '-'
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
        //in case of emptied slug it should pick title here
        if(slug=="") slug = title.replace(/\s+/g).toLowerCase();
    var content = req.body.content;

    //validate errors
    var errors = req.validationErrors();

    if(errors){
               res.render('admin/add_page',{  // will render in views/admin/add_page with variables
            errors: errors,
            title: title,
            slug: slug,
            content: content

        });
        console.log(errors)
    } //if no errors
    else{

         Page.findOne({slug: slug}, (err, page)=>{
            if(page) {
                req.flash('danger', "page slug exist, choose another");
                res.render('admin/add_page',{
                    title: title,
                    slug: slug,
                    content: content
                });
            } else{
                    var page = new Page({
                        title: title,
                        slug: slug,
                        content: content,
                        sorting:0  //To enter homepage, will be 100 in future
                    });

                    page.save(function(err){
                        if(err) return console.log(err);
                        req.flash('Success', 'page added!');
                        console.log('success')
                        res.redirect('/admin/pages');
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

 