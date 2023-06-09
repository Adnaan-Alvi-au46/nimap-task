const express = require('express');
const productrouter = express.Router();
const pool = require('../dbConfig')

// Get all products

productrouter.get('/allproducts/:pg', async (req, res) => {
  try {
    const {pg} = req.params
    const page = parseInt(pg)
    if(page===1){
     console.log(page)
    const allData = await pool.query(`SELECT * FROM product WHERE deleted='false' ORDER BY product_id LIMIT 10  OFFSET 0 `) ;
    console.log(allData.rows)
    res.json(allData.rows)
   }
   else{
    console.log(page)
    const X = (page*10)-10
    console.log(X)
    const allData = await pool.query(`SELECT * FROM product WHERE deleted='false' ORDER BY product_id LIMIT 9  OFFSET $1 `, [X]);
    console.log(allData.rows)
    res.json(allData.rows)
  }
} catch (error) {
    res.status(404).send({status:'error', msg:'Error fetching product from DB', error})
}
});

// Get products by ID

productrouter.get('/product/:id', async (req, res) => {
  try {

    const {id} = req.params
    const Data = await pool.query(`SELECT * FROM product WHERE product_id=$1 AND deleted='false'`,
    [id]);
    console.log(Data.rows)
    res.json(Data.rows)
   
} catch (error) {
    res.status(404).send({status:'error', msg:'Error fetching product from DB', error})
}
});


// Create a new product

productrouter.post('/postProduct', async (req, res) => {
  try{
    const { category_id, product_name} = req.body;
    console.log(category_id, product_name);
    const newDomain = await pool.query(
      `INSERT INTO product ( category_id, product_name,  deleted) 
      VALUES ($1,$2,'false') RETURNING *`,
      [ category_id, product_name]
    );
    console.log("inserted");
    res.json(newDomain.rows[0]);
  }
  catch (error){
    res.status(500).send({status: 'error', msg: "Error posting data in DB", error})
  }
  });

  //Update a product

  productrouter.put('/updateProduct/:id',async(req,res)=>{
    try{
      const { id } = req.params;
    const { product_name } = req.body;
    await pool.query(
      "UPDATE product SET product_name=$1,deleted='false' WHERE product_id = $2",
      [product_name, id]
    );
    console.log("updated");
    res.json("updated");
        }
        catch (error){
              res.status(500).send({status: 'error', msg: "Error updating data in DB", error})
            
            }
    });

 //Delete product

  productrouter.put('/deleteProduct/:id',async(req,res)=>{
    try{
      const { id } = req.params;
        await pool.query(`UPDATE product SET deleted=$1 WHERE product_ id = $2 RETURNING * `, ['true', id])
        console.log("deleted")
        res.json('deleted')
  }
  catch(error){
    res.status(500).send({status: 'error', msg: "Error deleting data in DB", error})
  }
  });

module.exports = productrouter;
