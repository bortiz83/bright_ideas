
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    alias: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    email: {
        type: String,
        minlength: 8,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        _id: String
    }],
    ideasLiked: [{
        _id: String
    }]
}, { 
    collection: 'users' 
});

const User = new mongoose.model('User', UserSchema);

module.exports = User;