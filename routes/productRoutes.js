const express = require('express');
const productrouter = express.Router();
const Product = require('../model/productModel');
const Category = require('../model/categoryModel');

// Get all products
productrouter.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category',{name:1,_id:0});
    res.status(200).send({status: 'success', products})
   
} catch (error) {
    res.status(404).send({status:'error', msg:'Error fetching product from DB', error})
}
});

// Get products by ID
productrouter.get('/product/:id', async (req, res) => {
  try {
    const productID = req.params.id
    const product = await Product.findById( productID ,{name:1}).populate('category',{name:1,_id:0});
    res.status(200).send({status: 'success', products})
   
} catch (error) {
    res.status(404).send({status:'error', msg:'Error fetching product from DB', error})
}
});


// Create a new product
productrouter.post('/postProduct/:id', async (req, res) => {
  try{
    const product = new Product({
      name: req.body.name,
      category:req.params.id,
    });
    const newProduct = await product.save();

    res.status(200).send({status: 'success', newProduct})
  }
  catch (error){
    res.status(500).send({status: 'error', msg: "Error posting data in DB", error})
  }
  });

  //Update a product
  productrouter.put('/updateProduct',async(req,res)=>{
    try{
      const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name
      }, { new: true });
      res.status(200).send({status: 'success', product})
    }
    catch (error){
      res.status(500).send({status: 'error', msg: "Error updating data in DB", error})
    
    }
    });

  productrouter.delete('/deleteProduct',async(req,res)=>{
    try{

      await Product.findByIdAndDelete(req.params.id);
      res.status(201).send({status: 'success', msg: 'product deleted successfully'})

  }
  catch(error){
    res.status(500).send({status: 'error', msg: "Error deleting data in DB", error})
  }
  });

module.exports = productrouter;




// // Get all products
// productrouter.get('/', async (req, res) => {
//   const pageSize = 10;
//   const page = parseInt(req.query.page) || 1;
//   const skip = (page - 1) * pageSize;
//   const products = await Product.find().skip(skip).limit(pageSize).populate('category');
//   const totalProducts = await Product.countDocuments();
//   const totalPages = Math.ceil(totalProducts / pageSize);
//   res.render('products/index', { products, totalPages, currentPage: page });
// });

// // Show the create product form
// productrouter.get('/new', async (req, res) => {
//   const categories = await Category.find();
//   // res.render('products/new', { categories });
//   res.send({msg:'success'});
// });

// // Create a new product
// productrouter.post('/', async (req, res) => {
//   const product = new Product({
//     name: req.body.name,
//     category: req.body.category
//   });
// })
// module.exports = productrouter;
