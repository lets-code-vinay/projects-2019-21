$(function(){
    //alert ('are you ok?');

})
$(function(){
        if($('textarea#ta').length){     
            CKEDITOR.replace('ta')
        }
    
    $('a.confirmDeletion').on('click', function(){
        if(!confirm('Confirm deletion'))
        return false;
    })
    
})



//export where you want to change text area