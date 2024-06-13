const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://rakib:Rakib%401999@cluster0.bwxs7wf.mongodb.net/ledger-management';

mongoose.connect(dbUri, {
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
});

module.exports = mongoose;
