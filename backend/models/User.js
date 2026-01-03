const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee"
    },
      mustChangePassword: {
      type: Boolean,
      default: true
    },

    phone: String,
    address: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
