const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const DoctorSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      index: true,
      sparse: true,
      lowercase: true,
      min: [6, "minimum User-Name length is 6 characters"],
      max: [20, "maximum User-Name length is 20 characters"],
      validate: {
        validator: function (value) {
          const self = this;
          return new Promise((resolve, reject) => {
            self.constructor
              .findOne({ email: value })
              .then((model) =>
                model._id ? reject(new Error(errorMsg)) : resolve(true)
              ) // if _id found then email already in use
              .catch((err) => resolve(true)); // make sure to check for db errors here
          });
        },
      },
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please enter a valid email address"],
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      minlength: [6, "minimum Password length is 6 characters"],
      maxlength: [100, "maximum Password length is 30 characters"],
    },
    phone: {
      type: Number,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    sessions: {
      type: [String],
    },
    daysOfWork: {
      type: [String],
      required: true,
    },
    workingHours: {
      type: [Number],
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

DoctorSchema.pre("save", async function (next) {
  // can't use arrow function here
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 12); // I determined the salt is used
});

DoctorSchema.methods.comparePassword = async function (enteredPassword, next) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = model("doctor", DoctorSchema);
