const mongoose = require('mongoose')
//funtion to connect with DB
const connetToDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connect ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message)
        process.exit(1);
    }
}
module.exports = connetToDB;