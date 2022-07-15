const User = require("../Models/users");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      dateOfBirth: req.body.dateOfBirth,
      photo: req.body.photo,
    });

    await newUser.save();
    res
      .status(201)
      .json({ msg: "User has been created successfully", msg2: newUser });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Email or Password incorrect"));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (error) {
        next(error);
      }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted");
      } catch (error) {
        next(error);
      }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
      } catch (error) {
        next(error);
      }
}

const getAllusers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
      } catch (error) {
        next(error);
      }
}

module.exports = { register, login, updateUser, getAllusers, getUser, deleteUser };
