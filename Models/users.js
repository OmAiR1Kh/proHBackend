const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'Please Enter Your First Name'],
        trim: true,
        min: [1, 'minimum first name length is 1 character'],
        max: [20, 'maximum first name length is 20 characters'],
    },
    lname: {
        type: String,
        required: [true, 'Please Enter Your Last Name'],
        trim: true,
        min: [1, 'minimum last-name length is 1 character'],
        max: [20, 'maximum last-name length is 20 characters'],
    },
    username: {
        type: String,
        required: [true, 'Please enter a valid userName'],
        trim: true,
        index: true,
        sparse: true,
        lowercase: true,
        min: [6, 'minimum User-Name length is 6 characters'],
        max: [20, 'maximum User-Name length is 20 characters'],
        validate: {
            validator: function (value) {
                const self = this;
                return new Promise((resolve, reject) => {
                    self.constructor.findOne({ email: value })
                        .then(model => model._id ? reject(new Error(errorMsg)) : resolve(true)) // if _id found then email already in use 
                        .catch(err => resolve(true)) // make sure to check for db errors here
                });
            },
        },
    },
    email: {
        type: String,  // can't be email like in mysql
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [6, 'minimum Password length is 6 characters'],
        maxlength: [100, 'maximum Password length is 30 characters'],
    },

    photo: {
        type: String,
        required: true,
        default: "non"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: [true, 'Please enter a valid Phone Number']
    },

    dateOfBirth: {
    type: String,
    required: true,
  },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true })


// Encrypting the password before saving it to the database
userSchema.pre('save', async function (next) {  // can't use arrow function here
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 16) // I determined the salt is used
})

userSchema.methods.comparePassword = async function (enteredPassword, next) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("users", userSchema);