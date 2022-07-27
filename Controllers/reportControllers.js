const Report = require("../Models/reports");

const createReport = async (req, res, next) => {
  const patientId = req.params.userid;
  const sessionId = req.params.sessionid;
  const newReport = new Report({
    reportContent: req.body.reportContent,
    sessionId: sessionId,
    patientId: patientId,
  });

  try {
    const savedReport = await newReport.save();

    res
      .status(201)
      .json({ msg: "report saved successfully", data: savedReport });
  } catch (err) {
    next(err);
  }
};

const updateReport = async (req, res, next) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "Report updated successfully", data: updatedReport });
  } catch (error) {
    next(error);
  }
};

const getReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    res.status(200).json({ data: report });
  } catch (error) {
    next(error);
  }
};

const getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find();
    res.status(200).json({ data: reports });
  } catch (error) {
    next(error);
  }
};

const deleteReport = async (req, res, next) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json("Report deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReport,
  updateReport,
  getReport,
  getAllReports,
  deleteReport,
};
