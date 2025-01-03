// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectMongoDB = require('./config/dbConfig');
const userController = require('./src/auth/controllers/userController');
const postRoutes = require('./src/posts/routes/postRoutes');
const likeRoutes = require('./src/likes/routes/likeRoutes');
// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 5000; // Use the provided port or default to 5000
app.use(bodyParser.json());
app.use(cors());  // Enable CORS for all routes

app.use('/api/auth', userController);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js backend server!');
});

// Start the server
app.listen(PORT, () => {
    // server started
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});
