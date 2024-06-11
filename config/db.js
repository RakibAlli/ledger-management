const mongoose = require("mongoose")

const MongoDB = mongoose.connect('mongodb://localhost:27017/ledger-management', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = MongoDB;