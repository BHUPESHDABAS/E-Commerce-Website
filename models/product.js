const mongoose = require('mongoose');
const { type } = require('os');
const {Schema} =  mongoose;

const prooductSchema = new mongoose.Schema({
    Name:{
        type : String,
        required: true
    } ,
    Description: {
        type : String ,
        required : true
    } ,
    Seller: {
        type : String,
        required : true
    } ,
    imageUrl: {
        type : String ,
        required : true
    } ,
    Price:{
        type : Number,
        required : true
    } ,
    category:{
        type: String,
        required: true
    },
    Review: [{
        type : String
    }]
});

module.exports = mongoose.model('products',prooductSchema);