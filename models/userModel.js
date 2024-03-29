const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
        default: ''
    },
    lastName: {
        type: String,
        required: false,
        default: ''
    },
    userName: {
        type: String,
        required: [true, 'Please fill your userName']
    },
    email: {
        type: String,
        required: [true, 'Please fill your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, ' Please provide a valid email']

    },
    company: {
        type: String,
        required: false,
        default: ''
    },
    address: {
        type: String,
        required: false,
        default: ''
    },
    phone: {
        type: String,
        required: false,
        default: ''
    },
    avatar: {
        type: String,
        required: false,
        default: ''
    },
    password: {
        type: String,
        required: [true, 'Please fill your password'],
        minLength: 6,
        select: false

    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true,
        select: false
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
userSchema.pre('save', async function (next) {
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }

    // check the password if it is modified
    if (!this.isModified('password')) {
        return next();
    }

    // Hashing the password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
userSchema.methods.correctPassword = async function (typedPassword, originalPassword) {
    return await bcrypt.compare(typedPassword, originalPassword);
};

const User = mongoose.model('user', userSchema);
module.exports = User;