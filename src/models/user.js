const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userScheme = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email address');
                }
            }
        },
        password: {
            type: String,
            required: true,
        }
    })
    //Methods

userScheme.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unaable to login');
    }

    return user;
}



//Middleware
userScheme.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next()
});

const User = mongoose.model('User', userScheme)

module.exports = User;