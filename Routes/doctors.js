const { Router } = require("express");
const Doctor = require("../Models/doctors");
const { createDoctor, updateDoctor, deleteDoctor, getDoctor, getAllDoctors, docLogin } = require ("../Controllers/doctorControllers");
const { verifyAdmin, verifyToken, verifyDoctor } = require("../utils/verifyToken");

const router = Router();

// CREATE

router.post("/create", verifyAdmin, createDoctor);
router.post('/login', docLogin )

// UPDATE

router.put("/update/:id", verifyDoctor, updateDoctor);
// DELETE

router.delete("/delete/:id", verifyAdmin, deleteDoctor);
// GET

router.get("/:id", verifyToken, getDoctor);
// GET ALL

router.get("/", verifyAdmin, getAllDoctors);

module.exports = router;
