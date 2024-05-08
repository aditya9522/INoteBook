const connectToMongoDB = require('./db');
const express = require('express');

connectToMongoDB();

const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('API data will be there!');
});

app.listen(port, () => {
    console.log(`App running on port: http://localhost:${port}/`);
});











