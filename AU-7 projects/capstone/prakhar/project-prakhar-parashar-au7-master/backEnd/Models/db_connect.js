import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://Prakhar:oneshopstore@cluster0-gsfal.mongodb.net/backendTest?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true })
.then(function(){
    console.log("Database connected")
})  
.catch((err) => {
    console.log(err.message)
  
})
