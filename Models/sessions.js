const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Your First Name"],
    },
    session_date: {
      type: Date,
      required: [true, "Please shoose a valid date"],
      unavailableDates: { type: [Date] },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("session", sessionSchema);
