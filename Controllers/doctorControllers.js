const Doctor = require('../Models/doctors')

const createDoctor = async (req, res, next) => {
    const newDoctor = new Doctor(req.body);

  try {
    const savedDoctor = await newDoctor.save();
    res.status(200).json(savedDoctor);
  } catch (error) {
    next(error);
  }
}

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
}

const deleteDoctor = async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.status(200).json("Doctor deleted");
      } catch (error) {
        next(error);
      }
}

const getDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
        res.status(200).json(doctor);
      } catch (error) {
        next(error);
      }
}

const getAllDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find()
        res.status(200).json(doctors);
      } catch (error) {
        next(error);
      }
}

module.exports = {createDoctor, updateDoctor, deleteDoctor, getDoctor, getAllDoctors}