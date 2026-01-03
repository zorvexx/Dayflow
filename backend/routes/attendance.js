const express = require("express");
const auth = require("../middleware/auth");
const Attendance = require("../models/Attendance");

const router = express.Router();

// CHECK-IN
router.post("/check-in", auth, async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const existing = await Attendance.findOne({
      userId: req.user.id,
      date: today
    });

    if (existing) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const attendance = await Attendance.create({
      userId: req.user.id,
      date: today,
      checkIn: new Date().toLocaleTimeString()
    });

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CHECK-OUT
router.post("/check-out", auth, async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      userId: req.user.id,
      date: today
    });

    if (!attendance) {
      return res.status(400).json({ message: "Not checked in yet" });
    }

    attendance.checkOut = new Date().toLocaleTimeString();
    await attendance.save();

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VIEW MY ATTENDANCE
router.get("/me", auth, async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.user.id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN: VIEW ALL ATTENDANCE
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  const records = await Attendance.find()
    .populate("userId", "name email employeeId");

  res.json(records);
});


module.exports = router;
