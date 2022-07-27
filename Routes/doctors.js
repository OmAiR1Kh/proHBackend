const { Router } = require("express");
const Doctor = require("../Models/doctors");
const { createDoctor, updateDoctor, deleteDoctor, getDoctor, getAllDoctors, docLogin, updatePassword } = require ("../Controllers/doctorControllers");
const { verifyAdmin, verifyToken, verifyDoctor } = require("../utils/verifyToken");

const router = Router();

// CREATE

router.post("/create", verifyAdmin, createDoctor);
router.post('/login', docLogin )

// UPDATE PASSWORD
router.post('/updatepass/:id', verifyDoctor, updatePassword)
// UPDATE

router.put("/update/:id", verifyDoctor, updateDoctor);
// DELETE

router.delete("/delete/:id", verifyAdmin, deleteDoctor);
// GET

router.get("/:id", verifyToken, getDoctor);
// GET ALL

router.get("/", verifyToken, getAllDoctors);

module.exports = router;
