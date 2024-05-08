const mongoose = require('mongoose');
// const mongooseURI = 'mongodb+srv://adityapatel8912:2u5qiO25iKBQaBDx@cluster0.b8lerql.mongodb.net/';
const mongooseURI = 'mongodb://localhost:27017';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongooseURI);
        console.log('MongoDB connected Successfully!');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectToMongoDB;
