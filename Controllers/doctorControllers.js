const Doctor = require("../Models/doctors");
const bcrypt = require("bcrypt");
const createError = require("../utils/error");
const jwt = require('jsonwebtoken');
const doctors = require("../Models/doctors");

const createDoctor = async (req, res, next) => {
  try {
    const newDoctor = new Doctor({
      name: req.body.name,
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
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (!doctor) {
      return next(createError(404, "doctor not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      doctor.password
    );
    if(!isPasswordCorrect) {
      return next(createError(400, "Email or Password incorrect"));
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

const updateDoctor = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // const doctor = doctor.findById('')

    // const isPasswordChanged = await bcrypt.compare(
    //   req.body.password,
    //   doctor.password
    // )

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { $set: req.body.password},
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
  deleteDoctor,
  getDoctor,
  getAllDoctors,
  docLogin,
};
