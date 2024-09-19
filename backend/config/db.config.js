const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DATABASE CONNECTION SUCCESS : ${conn.connection.name}`.bgGreen.black);
    } catch (error) {
        console.log(`ERROR IN DB CONNECTION : ${error.message}`.bgRed.black);
    }
};

module.exports = connectDB;