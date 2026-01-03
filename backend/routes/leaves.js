const express = require("express");
const auth = require("../middleware/auth");
const Leave = require("../models/Leave");

const router = express.Router();

// APPLY FOR LEAVE (Employee)
router.post("/", auth, async (req, res) => {
  try {
    const leave = await Leave.create({
      userId: req.user.id,
      ...req.body
    });

    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VIEW MY LEAVES (Employee)
router.get("/me", auth, async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.id });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VIEW ALL LEAVES (Admin)
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  const leaves = await Leave.find().populate("userId", "name email");
  res.json(leaves);
});

// APPROVE / REJECT LEAVE (Admin)
router.put("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(leave);
});

module.exports = router;
