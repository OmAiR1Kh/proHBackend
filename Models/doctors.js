const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minlength: [6, "minimum Password length is 6 characters"],
    maxlength: [100, "maximum Password length is 30 characters"],
    select: false,
  },
  phone: {
    type: Number,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true});

DoctorSchema.pre('save', async function (next) {  // can't use arrow function here
  if (!this.isModified('password')) {
      next();
  }

  this.password = await bcrypt.hash(this.password, 12) // I determined the salt is used
})

module.exports = model("doctor", DoctorSchema);
