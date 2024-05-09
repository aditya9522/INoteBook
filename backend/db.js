const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017/';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongooseURI);
        console.log('Connected to mongoDB successfully!');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectToMongoDB;
