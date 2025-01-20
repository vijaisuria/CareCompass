const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    activityType: {
      type: String,
      enum: ["chat", "goal", "summary"],
      required: true,
    },
    mood: {
      type: String,
      enum: ["happy", "stressed", "overwhelmed", "neutral"],
    },
    activityDetails: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
