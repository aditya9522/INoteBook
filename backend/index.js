const connectToMongoDB = require('./db');
const express = require('express');
const port = 3000;

connectToMongoDB();
const app = express();

app.get('/', (request, response) => {
    response.send('This is upi data!');
});

app.listen(port, () => {
    console.log(`App running on port: http://localhost:${port}`);
});








