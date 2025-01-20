const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

// Get all logs by user ID
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const logs = await Log.find({ userId }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching logs", error: err.message });
  }
});

// Get one log by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const log = await Log.findById(id);
    if (!log) return res.status(404).json({ message: "Log not found" });

    res.json(log);
  } catch (err) {
    res.status(500).json({ message: "Error fetching log", error: err.message });
  }
});

// Create a new log
router.post("/", async (req, res) => {
  const { userId, date, activityType, mood, activityDetails } = req.body;

  try {
    const newLog = new Log({
      userId,
      date,
      activityType,
      mood,
      activityDetails,
    });

    await newLog.save();
    res.status(201).json({ message: "Log created successfully", log: newLog });
  } catch (err) {
    res.status(500).json({ message: "Error creating log", error: err.message });
  }
});

module.exports = router;
