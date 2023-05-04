const mongoose = require('mongoose');
// const MongoUrl = database connection url have been removed before uploading 



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