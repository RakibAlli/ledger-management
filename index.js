const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('./config/db'); // Updated config import
const router = require('./src/router/router');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', router);

// Welcome Route
app.get('/', (req, res) => {
    res.status(200).json({ meta: { status: true, message: 'Welcome to ledger management' } });
});

// 404 Route
app.use('*', (req, res) => {
    res.status(404).json({ meta: { status: false, message: 'Not Found' } });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
