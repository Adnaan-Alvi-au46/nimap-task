const express = require('express');
const categoryrouter = express.Router();
// const Product = require('../models/product');
const Category = require('../model/categoryModel');

// Get all categories
categoryrouter.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send({status: 'success', categories})
       
    } catch (error) {
        res.status(404).send({status:'error', msg:'Error fetching categories from DB',error})
    }
});


// Create a new category
categoryrouter.post('/postCategory', async (req, res) => {
  try{
  const category = new Category({
    name: req.body.name
  });
  const newCategory = await category.save();
  res.status(200).send({status: 'success', newCategory})
}
catch (error){
  res.status(500).send({status: 'error', msg: "Error posting data in DB", error})
}
});


// Update a category
categoryrouter.put('/updateCategory/:id', async (req, res) => {
  try{
  const category = await Category.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, { new: true });
  res.status(200).send({status: 'success', category})
}
catch (error){
  res.status(500).send({status: 'error', msg: "Error updating data in DB", error})

}
});

// Delete a category
categoryrouter.delete('/deleteCategory/:id', async (req, res) => {
  try{

  await Category.findByIdAndDelete(req.params.id);
  res.status(201).send({status: 'success', msg: 'category deleted successfully'})

  }catch(error){
  res.status(500).send({status: 'error', msg: "Error deleting data in DB", error})

  }
});

module.exports = categoryrouter;