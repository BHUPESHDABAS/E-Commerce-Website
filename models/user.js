const mongoose = require('mongoose');
const product = require('./product');
const {Schema} =  mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: String,

    cart:[{
        id:{
            type: Schema.Types.ObjectId,
            required: true,
            ref:"products"
        },
        quantity: Number
    }] ,

    order:[{
        products: [],
        totalPrice: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }]
})

module.exports = mongoose.model('users',userSchema);

let users = [
    { 
        "name": "Bhupesh",
        "email": "bhupesh@gmail.com",
        "password": "12345",
        "cart": [] 
    },
    { 
        "name": "Chirag",
        "email": "chirag@gmail.com",
        "password": "123456",
        "cart": [] 
    },
    { 
        "name": "Deepak",
        "email": "deepak@gmail.com",
        "password": "1234567",
        "cart": [] 
    },
    
]