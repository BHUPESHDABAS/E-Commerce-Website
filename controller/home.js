const product = require('../models/product');
const Products = require('../models/product');
const Users = require('../models/user');


module.exports.getHome = async (req,res,next)=>{
    try{
        let products = await Products.find();
        const {getProductsCategoryWise} = require('../utils/library');
        products = getProductsCategoryWise(products);
        res.render('index',{
            products
        });
    }catch(err){
        next(err);
    }
}