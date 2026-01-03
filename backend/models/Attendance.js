const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: String,
      required: true
    },
    checkIn: String,
    checkOut: String,
    status: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      default: "Present"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
