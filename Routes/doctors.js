const { Router } = require("express");
const Doctor = require("../Models/doctors");
const { createDoctor, updateDoctor, deleteDoctor, getDoctor, getAllDoctors } = require ("../Controllers/doctorControllers");
const { verifyAdmin, verifyToken } = require("../utils/verifyToken");

const router = Router();

// CREATE

router.post("/create", verifyAdmin, createDoctor);

// UPDATE

router.put("/update/:id", verifyAdmin, updateDoctor);
// DELETE

router.delete("/delete/:id", verifyAdmin, deleteDoctor);
// GET

router.get("/:id", verifyToken, getDoctor);
// GET ALL

router.get("/", verifyAdmin, getAllDoctors);

module.exports = router;
