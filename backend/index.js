const connectToMongoDB = require('./db');
const cors = require("cors");
const express = require('express');

connectToMongoDB();

const app = express();
const port = 5000;

app.use(cors());   // for use other domain in current domain
app.use(express.json())   // added middleware to send request in JSON

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// app.get('/', (req, res) => {
//     res.send("Welcome user notify.")
// })

// app.get('/user', (req, res) => {
//     res.send("here you will get all the users details.")
// })

app.listen(port, () => {
    console.log(`App running on port: http://localhost:${port}/`);
});
