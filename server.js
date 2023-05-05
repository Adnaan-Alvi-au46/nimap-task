const express = require('express')
const app = express();
// const connectDB = require('./dbConfig');
const productrouter = require('./routes/productRoutes');
const categoryrouter = require('./routes/categoryRoutes');

const prt = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(productrouter)
app.use(categoryrouter)

app.listen(prt,(error)=>{

if(!error){
    console.log('server started sucessfull at 3000')
    // connectDB()
}
else{
    console.log(error)
}
})