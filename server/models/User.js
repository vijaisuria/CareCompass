const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    education: { type: String },
    profession: { type: String },
    bio: { type: String, maxlength: 250 },
    moodHistory: [
      {
        date: { type: Date, default: Date.now },
        mood: {
          type: String,
          enum: ["happy", "stressed", "overwhelmed", "neutral"],
        },
      },
    ],
    conversationHistory: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
