const { Router } = require("express");
const { verifyDoctor } = require("../utils/verifyToken");
const {
  createReport,
  updateReport,
  getReport,
  getAllReports,
  deleteReport,
} = require("../Controllers/reportControllers");
const router = Router();

// create Report
router.post("/create/:userid/:sessionid", verifyDoctor, createReport);

// update Report
router.put('/edit/:id', verifyDoctor, updateReport);

// get report
router.get('/', verifyDoctor, getReport);

// get all reports
router.get('/all', verifyDoctor, getAllReports);

router.delete('/delete/:id', verifyDoctor, deleteReport);

module.exports = router