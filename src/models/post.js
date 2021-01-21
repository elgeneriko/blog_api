const mongoose = require('mongoose');
const validator = require('validator');

const Post = mongoose.model('Post', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isDate(value)) {
                throw new Error('Invalid date format');
            }
        }
    }
});

module.exports = Post;