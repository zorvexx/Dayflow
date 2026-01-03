const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["Sick", "Paid", "Unpaid"],
      required: true
    },
    fromDate: {
      type: String,
      required: true
    },
    toDate: {
      type: String,
      required: true
    },
    reason: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },
    adminComment: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", LeaveSchema);
