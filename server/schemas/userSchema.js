const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    contact: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;