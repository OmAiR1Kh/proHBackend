const Doctor = require("../Models/doctors");
const bcrypt = require("bcrypt");
const createError = require("../utils/error");
const jwt = require('jsonwebtoken');

const createDoctor = async (req, res, next) => {
  try {
    const newDoctor = new Doctor({
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      specialty: req.body.specialty,
    });
    const savedDoctor = await newDoctor.save();
    res
      .status(201)
      .json({ msg: "User has been created successfully", msg2: savedDoctor });
  } catch (error) {
    next(error);
  }
};

const docLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;
    console.log(`Pass == ${pass}`);
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return next(createError(404, "doctor not found"));
    }
    const isPasswordCorrect = await doctor.comparePassword(pass);
    if(!isPasswordCorrect) {
      return next(createError(401, "Email or Password incorrect"));
    }
    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT
    );
    const { password, ...otherDetails } = doctor._doc;
    res.cookie("doctor_token", token, {
      httpOnly: true,
    })
    .status(201)
    .json({...otherDetails});

  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  console.log(req.params.id)
  try {
    const user = await Doctor.findById(req.params.id);
    console.log(user)
    const updatePassword = Doctor.findByIdAndUpdate(req.params.id, {password: req.body.password}, {new: true} )
    res.status(200).json({msg: "Password updated successfully.", data: user});
  } catch (error) {
    next(error);
  }
};

const updateDoctor = async (req, res, next) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedDoctor);    
  } catch (error) {
    next(error);
  }
};

const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json("Doctor deleted");
  } catch (error) {
    next(error);
  }
};

const getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.status(200).json(doctor);
  } catch (error) {
    next(error);
  }
};

const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDoctor,
  updateDoctor,
  updatePassword,
  deleteDoctor,
  getDoctor,
  getAllDoctors,
  docLogin,
};
