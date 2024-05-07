const mongoose = require('mongoose');
const { DB_NAME } = require('../constants.js');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log(DB_NAME);
        const dbConnect = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected: ${dbConnect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

module.exports = connectDB;