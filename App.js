const path = require ('path');
const express = require ('express');
const app = express();
const hbs = require('hbs');
const PORT = 4444;
const mongoose = require('mongoose');
hbs.registerPartials(__dirname + '/views/partials'); //regitered partials 


const User = require('./models/user'); // requiring users
app.use(async (req,res,next)=>{
    let user = await User.findOne({
        _id: "6753f6e9773d625c8b893bf8"
    })
    req.user = user;
    next();
})


app.set('view engine','hbs');
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'public'))); //linking public folder

//Home page render
const homeRouter = require('./routes/home')
app.get('/',homeRouter);


//Routers
const adminRouter = require('./routes/admin'); //admin router
app.use('/admin',adminRouter);

const shopRouter = require('./routes/shop'); // shop router
app.use('/shop',shopRouter);



mongoose.connect('mongodb://127.0.0.1:27017/E-commerce_Website').then(()=>{
    app.listen(PORT , ()=>{
        console.log(`http://localhost:`+PORT);
    });
}).catch(err=>{
    console.log(err);
});

