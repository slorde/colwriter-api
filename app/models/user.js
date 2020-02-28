const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    login: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});