const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");
const Log = require("../models/Log");

const { getLearningPath, getUniversalSkills } = require("../utils/roadmap");

const { getMilestones } = require("../utils/milestone");

// Get all goals by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const goals = await Goal.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res
      .status(500)
      .json({ message: "Error fetching goals", error: error.message });
  }
});

// Get one goal by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.status(200).json(goal);
  } catch (error) {
    console.error("Error fetching goal:", error);
    res
      .status(500)
      .json({ message: "Error fetching goal", error: error.message });
  }
});

// Create a new goal (without milestones)
router.post("/", async (req, res) => {
  try {
    const { userId, title, description, category, deadline } = req.body;

    const newGoal = new Goal({
      userId,
      title,
      description,
      category,
      deadline,
    });

    // education category
    if (category === "educational") {
      const { role, userSkills } = req.body;
      const universalSkills = await getUniversalSkills(role, userSkills);
      const learningPath = await getLearningPath(role, universalSkills);

      newGoal.roadMapJson = learningPath;
    } else {
      const milestones = await getMilestones(req.body);

      newGoal.milestones = milestones;
    }

    await newGoal.save();

    const log = new Log({
      userId,
      date: new Date(),
      activityType: "goal",
      activityDetails: {
        details: "Goal Created" + newGoal.title,
        goalId: newGoal._id,
      },
    });

    await log.save();

    res
      .status(201)
      .json({ message: "Goal created successfully", goal: newGoal });
  } catch (error) {
    console.error("Error creating goal:", error);
    res
      .status(500)
      .json({ message: "Error creating goal", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { milestones } = req.body;

    // Find the goal
    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    // Update milestones
    if (Array.isArray(milestones)) {
      milestones.forEach((milestone) => {
        const existingMilestone = goal.milestones.id(milestone._id);
        if (existingMilestone) {
          // Update existing milestone
          existingMilestone.set(milestone);

          // If milestone is completed, set completedAt if not already set
          if (milestone.completed && !existingMilestone.completedAt) {
            existingMilestone.completedAt = new Date();
          }
        } else {
          // Add new milestone
          goal.milestones.push(milestone);
        }
      });
    }

    // Check if all milestones are completed
    const allCompleted = goal.milestones.every(
      (milestone) => milestone.completed
    );

    if (allCompleted) {
      goal.completed = true;
      goal.completedAt = goal.completedAt || new Date(); // Set completedAt if not already set
    } else {
      goal.completed = false; // Reset if any milestone is incomplete
      goal.completedAt = null;
    }

    await goal.save();
    res.status(200).json({ message: "Goal updated successfully", goal });
  } catch (error) {
    console.error("Error updating goal:", error);
    res
      .status(500)
      .json({ message: "Error updating goal", error: error.message });
  }
});

module.exports = router;
