const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const productSchema = new Schema({
    name: { 
        type: String,
        //  required: true
         },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category' }
});

const productModel= mongoose.model('product',productSchema);
module.exports=productModel;