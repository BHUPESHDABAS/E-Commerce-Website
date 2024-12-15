const product = require('../models/product');
const Products = require('../models/product');


//Get Request
module.exports.getAdminHomePage =(req,res,next)=>{
    res.render('admin/home');  
}

module.exports.getProductsAll = async(req,res,next)=>{
    const products = await Products.find();
    console.log(products);
    let data = {};
    products.forEach(product =>{
        let arr = data[product.category] || [];
        arr.push(product);
        data[product.category] = arr;
    })
    res.render('admin/products-list',{
        products:data
    });
}  

module.exports.getProductsAdd = (req,res,next)=>{
    res.render('admin/add-product');
}

module.exports.getProductsUpdate = async(req,res,next)=>{
    const { id } = req.params;
    try{
        const product = await Products.findById(id);
        res.render('admin/update_product',{
            product
        });
    }
    catch(err){
        next(err);
    }
}


module.exports.getProductDelete = async (req,res,next)=>{
    const {id} = req.params;
    try{
        let p = await Products.deleteOne({_id: id});
       
        res.redirect('/admin/products/all');
    } 
    catch(err){
        res.send(err);
    }
}





//Post Request
module.exports.postProductsAdd = async(req,res,next)=>{
    const {Name,Price,Description,Seller,imageUrl,category} = req.body;

   try{
        await Products.create({
        Name,
        Price,
        Description,
        Seller,
        imageUrl,
        category
        });
    
        res.redirect('/admin/products/all');
    } 
    catch(err){
        res.send(err);
    }
}


module.exports.postProductsUpdate = async(req,res,next)=>{
    const {Name,Description,Seller,imageUrl,Price,id} = req.body;

   try{
        let p = await Products.findById(id);
        p.Name = Name;
        p.Description = Description;
        p.Seller = Seller;
        p.imageUrl = imageUrl;
        p.Price = Price;
        
        await p.save();

        res.redirect('/admin/products/all');
    } 
    catch(err){
        res.send(err);
    }
}



