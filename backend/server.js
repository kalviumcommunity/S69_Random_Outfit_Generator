const express = require('express');
const connectToMongodb = require('./db/database.js');
const app = express();
const dotenv = require('dotenv');
const router = require('./router.js');
const cors = require('cors');
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Mount the router under the /api prefix
app.use('/api', router);

// Route to test server
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Start the server
app.listen(PORT, () => {
    connectToMongodb();
    console.log(`Server is running on http://localhost:${PORT}`);
});
