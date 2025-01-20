const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

// Initialize OpenAI client
const client = new OpenAI({ baseURL: endpoint, apiKey: token });

// Middleware for parsing JSON
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Initialize conversation
const initializeConversation = (userName, userBackground, userGoal) => [
  {
    role: "system",
    content: `You are an empathetic and supportive chatbot named [BOT NAME]. Your role is to assist users by understanding their context, emotions, and past interactions. Here is the user's profile: \n\n- Name: ${userName}\n- Background: ${userBackground}\n- Current Goal: ${userGoal}\n\nWhen the user shares their thoughts or experiences, respond with empathy and constructive advice. If they are facing challenges, offer motivational and actionable suggestions to help them overcome their struggles. If they share a success, celebrate it and encourage them to keep progressing. Always provide contextually relevant and thoughtful responses.\n\nUser Input: {USER_MESSAGE}\n\nYour response should:\n1. Acknowledge the user's emotion and context.\n2. Provide empathetic support.\n3. Suggest actionable steps or celebrate success as appropriate.`,
  },
];

let conversationHistory = initializeConversation(
  "Vijai",
  "Final-year CSE student at MIT",
  "Looking for a Software Engineer Fresher Role"
);

// Route for home page
app.get("/", (req, res) => {
  res.send("Welcome to the chatbot!");
});

// Route for chat interaction
app.post("/chat", async (req, res) => {
  try {
    const userInput = req.body.message;
    console.log("User Input:", userInput);
    if (!userInput) {
      return res.status(400).send({ error: "Message is required." });
    }

    // Append user's message to conversation history
    conversationHistory.push({ role: "user", content: userInput });

    // Stream the response from OpenAI
    const stream = await client.chat.completions.create({
      messages: conversationHistory,
      model: modelName,
      stream: true,
    });

    res.setHeader("Content-Type", "text/plain");

    for await (const part of stream) {
      const delta = part.choices[0]?.delta?.content || "";
      res.write(delta); // Send data incrementally to the client
    }

    res.end(); // End the streaming response
  } catch (error) {
    console.error("Error during chat interaction:", error);
    res
      .status(500)
      .send({ error: "An error occurred while processing the request." });
  }
});

app.post("/chat/test", async (req, res) => {
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

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
