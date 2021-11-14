const express = require ('express');
const app = express();
const env = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const path = require('path');
env.config();

//mongoDB         
    mongoose.connect('mongodb+srv://ecom123:ecommerce21@cluster0.w5oua.mongodb.net/Ecommerce?retryWrites=true&w=majority', {useNewUrlParser:true, 
                    useUnifiedTopology:true,
                    useCreateIndex:true
               })
    .then(() => console.log('--connected to db--'))
    .catch(err => console.error('====Unable to connect====',err))
    
    
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/public/', express.static(path.join(__dirname, 'uploads')))

app.use(cors())
app.use('/api', authRoutes)
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.get('/', (req, res, next)=>{
    res.status(200).json({message: 'Hii from server'})
})

app.post('/data', (req, res)=>{
    res.status(200).json({
        message:req.body
    })
})
const port = process.env.PORT || 3000

app.listen (port, () => {
    console.log(`Server is running on port no:  ${port}`)
})