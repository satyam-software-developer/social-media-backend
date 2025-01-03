const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectMongoDB() {
    try {
        let mongoURI;
        if (process.env.NODE_ENV === 'production') {
            mongoURI = process.env.MONGODB_URI_PROD;
            console.log(mongoURI);
        } else {
            mongoURI = process.env.MONGODB_URI;
        }
        await mongoose.connect(mongoURI);
        console.log("DB connected");
    } catch (error) {
        console.log("Was not able to connect to MongoDB", error);
    }
}

module.exports = connectMongoDB;