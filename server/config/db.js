const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error(`Please make sure your MongoDB service is running and the URI in .env is correct.`);
        // Don't exit the process here so nodemon keeps trying or we can see the error
    }
};

module.exports = connectDB;
