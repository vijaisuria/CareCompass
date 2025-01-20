const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", user_id: user._id, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Logic for sending password reset link would go here (e.g., via email)
    res.json({ message: "Password reset link sent" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Onboard
router.post("/onboard", async (req, res) => {
  const { id, education, profession, bio } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "User not found" });

    user.education = education;
    user.profession = profession;
    user.bio = bio;

    await user.save();
    res.json({ message: "User onboarded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

module.exports = router;
