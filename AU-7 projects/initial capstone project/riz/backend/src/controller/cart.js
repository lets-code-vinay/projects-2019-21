const Cart = require('../models/cart');

exports.addItemToCart = (req, res) => {
//----------------req.body working testing------------
       // res.status(200).json({json:req.body})

    Cart.findOne({user:req.user._id})
    .exec((error, cart)=>{
        if(error) return res.status(400).json({error});

        if(cart){
                // if cart is already exist then update with quantity            
            
            const product = req.body.cartItems.product;
            const item =cart.cartItems.find(c => c.product == product );
            let condition , update;
            if(item){
                condition = { "user": req.user._id, "cartItems.product":product };
                update = {
                    "$set":{
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                }
                Cart.findOneAndUpdate(condition, update )
//console.log("Testing cart", cart)
                .exec((error, _cart)=>{
                    if(error) return res.status(400).json({ error });
                    if(_cart){
                        return res.status(201).json({cart: _cart})
                    }
//console.log('testing _cart', _cart)
                })
            }else{
                condtion = { user: req.user._id };
                update = {
                    "$push":{
                        "cartItems": req.body.cartItems
                    }
                };

               }
               Cart.findOneAndUpdate( condition, update )
               //console.log("Testing cart", cart)
                               .exec((error, _cart)=>{
                                   if(error) return res.status(400).json({ error });
                                   if(_cart){
                                       return res.status(201).json({cart: _cart})
                                   }
               console.log('testing _cart', _cart)
                               })
                           }
                           
                               // return res.status(200).json({message:cart})
                       
        else{

            //if cart is not exist then create a new cart
            const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
//-----not getting output from here----
                });
            console.log('This is cart', cart)                
            cart.save((error, cart)=>{
                    if(error){
                        return res.status(400).json({error});
                    } 
                    if(cart){
                        console.log(1)
//-----not getting response from here----
                        return res.status(200 ).json({cart, message:'cart test'})
                        console.log(2)
                    }
                })
            }
    })


}