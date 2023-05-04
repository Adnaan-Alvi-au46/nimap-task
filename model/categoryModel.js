const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const categorySchema = new Schema({
   name:{
    type:String,
    required:true,
   }
})

const categoryModel = mongoose.model('category',categorySchema)
module.exports = categoryModel;