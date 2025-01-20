const express = require("express");
const router = express.Router();
const Log = require("../models/Log");
const Goal = require("../models/Goal");

require("dotenv").config();

const { body, param, validationResult } = require("express-validator");
const { getLearningPath, getUniversalSkills } = require("../utils/roadmap");

// Define the API endpoint for generating the learning path

router.post(
  "/:goalId",
  [
    param("goalId").isMongoId().withMessage("Invalid goal ID"),
    body("role").notEmpty().withMessage("Role is required"),
    body("userSkills").notEmpty().withMessage("User skills are required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { role, userSkills } = req.body;
      const goalId = req.params.goalId;

      const universalSkills = await getUniversalSkills(role, userSkills);
      const learningPath = await getLearningPath(role, universalSkills);

      // Update Goal document
      const goal = await Goal.findByIdAndUpdate(
        goalId,
        { roadMapJson: learningPath },
        { new: true }
      );

      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }

      // Log the event
      try {
        const log = new Log({
          userId: goal.userId,
          date: new Date(),
          activityType: "goal",
          activityDetails: `Generated learning path for ${role}`,
        });
        await log.save();
      } catch (logError) {
        console.error("Error logging the event:", logError);
      }

      res.status(200).json({ data: learningPath });
    } catch (error) {
      console.error("Error generating learning path:", error);
      res.status(500).json({
        message: "An error occurred while generating the learning path.",
        error: error.message,
      });
    }
  }
);

module.exports = router;
