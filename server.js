const express = require('express');
const  connectToMongodb  = require('./db/database.js');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;

// Route to test server
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Start the server
app.listen(PORT, () => {
    connectToMongodb()
    console.log(`Server is running on http://localhost:${PORT}`);
});