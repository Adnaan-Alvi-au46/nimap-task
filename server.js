const express = require('express')
const app = express();
// dotenv.config();
// const cors = require("cors")
const connectDB = require('./dbConfig');
const productrouter = require('./routes/productRoutes');
const categoryrouter = require('./routes/categoryRoutes');
// const cookieparser = require('cookie-parser')

const prt = 3000

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(cookieparser())

app.use(productrouter)
app.use(categoryrouter)

app.listen(prt,(error)=>{

if(!error){
    console.log('server started sucessfull at 3000')
    connectDB()
}
else{
    console.log(error)
}
})