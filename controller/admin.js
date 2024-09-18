const Products = require('../models/products');

module.exports.getAdminHome=(req,res,next)=>{
    res.render('admin/home',);
}

module.exports.postProductsAdd = async (req,res,next)=>{
    const {name,price,description,seller,imageUrl}= req.body;
    
    try{
        await Products.create({
            name,
            price,
            description,
            seller,
            imageUrl
        })
        res.redirect('/admin/products/all',);
    }
    catch(err){
        res.send(err)
    }
}

module.exports.getProductsAll = async (req,res,next)=>{
    const products = await Products.find();
    console.log(products);
    // res.send(products);
    res.render('admin/products-list',{
        products
    });
}


module.exports.getProductsAdd = (req,res,next)=>{
    res.render('admin/add-product');
}

module.exports.getProductsUpdate =async (req,res,next)=>{
    const {id} = req.params;
    try{
        const product = await Products.findById(id);
        res.render('admin/update-product',{
            product
        });
    }
    catch(err){
        next(err);
    }
}

module.exports.postProductUpdate = async (req,res,next)=>{
    const {name,price,description,seller,imageUrl,id}= req.body;
    
    try{
        let p = await Products.findById(id);
        p.name = name;
        p.price = price;
        p.description = description;
        p.imageUrl = imageUrl;
        p.seller = seller;

        await p.save();
        res.redirect('/admin/products/all',);
    }
    catch(err){
        res.send(err)
    }
}

module.exports.getDeleteProductById = async (req,res,next)=>{
    const {id} = req.params;
    
    try{
        let p = await Products.deleteOne({_id:id});
        res.redirect('/admin/products/all',);
    }
    catch(err){
        res.send(err)
    }
}