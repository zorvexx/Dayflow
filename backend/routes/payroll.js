const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, (req, res) => {
  res.json({
    basic: 30000,
    hra: 12000,
    allowances: 5000,
    deductions: 2000,
    netPay: 45000
  });
});

router.get("/", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  res.json([
    { name: "Admin User", netPay: 45000 },
    { name: "Test User", netPay: 42000 }
  ]);
});

module.exports = router;
