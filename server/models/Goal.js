const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
});

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["personal", "professional", "educational"],
      required: true,
    },
    milestones: [milestoneSchema],
    deadline: { type: Date },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
    roadMapJson: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
