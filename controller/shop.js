const product = require('../models/product');
const Products = require('../models/product');
const Users = require('../models/user');


module.exports.getHome = async (req,res,next) =>{
    try{
        let products = await Products.find({});
        const {getProductsCategoryWise} = require('../utils/library');
        let productsCategory = getProductsCategoryWise(products);
        console.log(req.user);
        res.render('shop/home', {
            products: productsCategory
        });
    }catch(err){

    }
}

module.exports.getProductsAll = async (req,res,next) =>{
    try{
        let products = await Products.find({});
        const {getProductsCategoryWise} = require('../utils/library');
        let productsCategory = getProductsCategoryWise(products);
    }catch(err){

    }
}


module.exports.getProductsById = async (req,res,next) =>{
    try{
        const {id} = req.params;
        let product = await Products.findOne({_id: id});
        res.render('shop/product-details',{
            product: product
        })
    }catch(err){

    }
}


module.exports.getCart = async (req,res,next) =>{
    try{
        const {id} = req.params;
        let user = await Users.findOne({_id: req.user._id}).populate('cart.id');

        console.log(user.cart);
        let totalPrice = 0;
        user.cart.forEach((item)=>{
            totalPrice += item.id.Price * item.quantity ;
        })
        res.render('shop/cart',{
            cart: user.cart,
            totalPrice: totalPrice
        })
    }catch(err){

    }
}


module.exports.getAddToCartById = async (req, res, next) => {
    try {
        const { id } = req.params;
        let cart = req.user.cart;
        let indx = -1;
        cart.forEach((item, i) => {
            if (item.id == id) {
                indx = i;
            }
        })
        if (indx == -1) {
            cart.unshift({
                id: id,
                quantity: 1
            })
        }
        else {
            cart[indx].quantity++;
        }

        req.user.save();
        res.redirect('/shop/cart');
    } catch (err) {
        next(err);
    }
}


module.exports.getIncrease = async (req,res,next) => {
    const {id} = req.params;
    let cart = req.user.cart;
    let indx;

    cart.forEach((item, i) => {
       if(item.id == id){
           indx = i;
       }
    })

    cart[indx].quantity++;
    req.user.save();

    try{
        let user = await Users.findOne({_id: req.user._id}).populate('cart.id');
        let totalPrice = 0;
        user.cart.forEach((item)=>{
            totalPrice += item.id.price * item.quantity;
        })
        res.send({
            id: user.cart,
            totalPrice
        });
    }catch(err){
        next(err);
    }
}

module.exports.getDecrease = async (req,res,next) => {
    const {id} = req.params;
    let cart = req.user.cart;
    let indx;

    cart.forEach((item, i) => {
       if(item.id == id){
           indx = i;
       }
    })
    if(cart[indx].quantity>1)
        cart[indx].quantity--;
    else if(cart[indx].quantity == 1)
        cart.splice(indx,1);
    req.user.save();
    try{
        let user = await Users.findOne({_id: req.user._id}).populate('cart.id');
        let totalPrice = 0;
        user.cart.forEach((item)=>{
            totalPrice += item.id.price * item.quantity;
        })
        res.send({
            id: user.cart,
            totalPrice
        });
    }catch(err){
        next(err);
    }
}



module.exports.getCartBuy = async (req,res,next) =>{
    try{
        let cart = req.user.cart.populate('cart.id');
        console.log(cart);
    } catch (err){
        
    }
}