const express = require("express");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// ADMIN: CREATE USER WITH TEMP PASSWORD
router.post("/create-user", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const { employeeId, name, email, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await User.create({
      employeeId,
      name,
      email,
      role: role || "employee",
      password: hashedPassword,
      mustChangePassword: true
    });

    // IMPORTANT: return temp password ONCE
    res.status(201).json({
      message: "User created successfully",
      tempPassword
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
