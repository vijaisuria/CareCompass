const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
require("dotenv").config();

const User = require("../models/User");

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

// Initialize OpenAI client
const client = new OpenAI({ baseURL: endpoint, apiKey: token });

// Initialize conversation
const initializeConversation = (name, education, profession, bio) => [
  {
    role: "system",
    content: `You are CareCompassAI, a compassionate and supportive virtual companion. Here is the user's profile: 

- Name: ${name}
- Education: ${education}
- Profession: ${profession}
- Bio: ${bio}

Your goal is to act like an empathetic, supportive friend. When the user shares their thoughts:
1. Acknowledge their feelings and context warmly.
2. Offer encouragement or practical suggestions if they face challenges.
3. Celebrate successes enthusiastically and motivate further progress.

Keep responses conversational, friendly, and human-like to make the user feel heard and valued.`,
  },
];

router.post("/", async (req, res) => {
  try {
    const userInput = req.body.message;
    const userId = req.body.userId;

    if (!userInput) {
      return res.status(400).send({ error: "Message is required." });
    }

    // Get the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }

    // Load or initialize the conversation history
    let conversationHistory;
    if (!user.conversationHistory || user.conversationHistory.length === 0) {
      console.log("Initializing conversation history...");
      conversationHistory = initializeConversation(
        user.name,
        user.education,
        user.profession,
        user.bio
      );
    } else {
      conversationHistory = user.conversationHistory;
    }

    // Append the user's input to the conversation history
    conversationHistory.push({ role: "user", content: userInput });

    // Generate a response from OpenAI
    const stream = await client.chat.completions.create({
      messages: conversationHistory,
      model: modelName,
      stream: true,
    });

    res.setHeader("Content-Type", "text/plain");

    let assistantReply = "";

    for await (const part of stream) {
      const delta = part.choices[0]?.delta?.content || "";
      assistantReply += delta;
      res.write(delta); // Stream data incrementally to the client
    }

    res.end(); // End the streaming response

    // Append the assistant's reply to the conversation history
    conversationHistory.push({ role: "assistant", content: assistantReply });

    // Save the updated conversation history back to the user
    user.conversationHistory = conversationHistory;
    await user.save();
  } catch (error) {
    console.error("Error during chat interaction:", error);
    res
      .status(500)
      .send({ error: "An error occurred while processing the request." });
  }
});

router.post("/test", async (req, res) => {
  try {
    const sampleOutput = [
      `**User Input:** ${req.body.message}\n\n`,
      "This is a sample response part 1. ",
      "This is a sample response part 2. ",
      "This is a sample response part 3. ",
    ];

    res.setHeader("Content-Type", "text/plain");

    for (const part of sampleOutput) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
      res.write(part); // Send data incrementally to the client
    }

    res.end(); // End the streaming response
  } catch (error) {
    console.error("Error during test interaction:", error);
    res
      .status(500)
      .send({ error: "An error occurred while processing the request." });
  }
});

module.exports = router;
