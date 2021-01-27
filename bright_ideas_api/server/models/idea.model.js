
const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
    whoPosted: {
        _id: String,
        email: String,
        alias: String,
        name: String
    },
    ideaText: {
        type: String,
        minlength: 5,
        required: true
    },
    numberOfLikes: {
        type: Number
    },
    whoLiked: [{
        _id: String,
        email: String,
        alias: String,
        name: String
    }]
}, { 
    collection: 'ideas' 
});

const Idea = new mongoose.model('Idea', IdeaSchema);

module.exports = Idea;