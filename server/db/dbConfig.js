const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    dbName: "SSO",
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

    module.exports = connection;