const { Router } = require("express");
const Doctor = require("../Models/doctors");
const { createDoctor, updateDoctor, deleteDoctor, getDoctor, getAllDoctors } = require ("../Controllers/doctorControllers");

const router = Router();

// CREATE

router.post("/create", createDoctor);

// UPDATE

router.put("/update/:id", updateDoctor);
// DELETE

router.delete("/delete/:id", deleteDoctor);
// GET

router.get("/:id", getDoctor);
// GET ALL

router.get("/", getAllDoctors);

module.exports = router;
