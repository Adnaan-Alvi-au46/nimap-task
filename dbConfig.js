const mongoose = require('mongoose');
const MongoUrl = 'mongodb+srv://Adnaanalvi:808045@cluster0.vszagcg.mongodb.net/test'    



async function connectDB(){
    try {
        await mongoose.connect(MongoUrl,{dbName:'NimapTask'})
        console.log('DB connection successfull')
    } catch (error) {
        console.log(error)
        process.exit()
    }
};
module.exports  = connectDB;