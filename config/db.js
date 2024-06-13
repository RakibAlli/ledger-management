const mongoose = require("mongoose")

const MongoDB = mongoose.connect('mongodb+srv://rakib:Rakib%401999@cluster0.bwxs7wf.mongodb.net/ledger-management', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = MongoDB;