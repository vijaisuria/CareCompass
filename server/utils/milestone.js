const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

// Initialize OpenAI client
const client = new OpenAI({ baseURL: endpoint, apiKey: token });

// Utility function to generate milestones
async function getMilestones({ title, description, category, deadline }) {
  try {
    const currentDate = new Date();
    const endDate = new Date(deadline);
    const remainingDays = Math.ceil(
      (endDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    console.log("Current Date:", currentDate.toISOString());
    console.log("End Date:", endDate.toISOString());
    console.log("Remaining Days:", remainingDays);

    const prompt = `You are a helpful assistant specializing in generating milestones for goals. Your task is to create a structured list of milestones that progressively lead to achieving the final objective. Each milestone should include the following fields:

- Title (short and descriptive)
- Description (optional but helpful details)
- Deadline (specific date in ISO format: YYYY-MM-DD)

Here is the Goal information:

Title: ${title}
Description: ${description}
Category: ${category}
Deadline: ${deadline}

Current Date: ${
      currentDate.toISOString().split("T")[0]
    } (remaining days: ${remainingDays})

Please ensure the milestones:
1. Cover the entire period up to the deadline.
2. Are ordered chronologically.
3. Are realistic and actionable.
4. Use the correct format as a JSON array.

Example format:
[
  { "title": "Milestone 1", "description": "Details here", "deadline": "2025-01-25" },
]

Respond with only the JSON array. Do not include any additional text or explanations.`;

    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant for generating goal milestones.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 500,
      model: modelName,
    });

    let milestones;
    try {
      // Use regex to extract the JSON array from the response
      const match = response.choices[0].message.content.match(/(\[.*\])/s);
      if (match) {
        milestones = JSON.parse(match[1]);
      } else {
        throw new Error("Response did not contain valid JSON.");
      }
    } catch (parseError) {
      console.error("Failed to parse milestones JSON:", parseError);
      throw new Error("Invalid JSON format in AI response.");
    }

    // Validate the format of the milestones
    if (
      Array.isArray(milestones) &&
      milestones.every(
        (m) => m.title && m.deadline && !isNaN(new Date(m.deadline).getTime())
      )
    ) {
      return milestones.map((m) => ({
        title: m.title,
        description: m.description || "",
        deadline: new Date(m.deadline),
        completed: false,
      }));
    } else {
      throw new Error("Invalid milestone format received from AI.");
    }
  } catch (error) {
    console.error("Error generating milestones:", error);
    throw new Error("Failed to generate milestones.");
  }
}

module.exports = { getMilestones };

// testing
// const task = {
//   title: "Acne free skin",
//   description: "Indian 18 year old boy recently facing face acne",
//   category: "personal",
//   deadline: "2025-02-01",
// };

// console.log(
//   getMilestones(task)
//     .then((milestones) => console.log("Generated milestones:", milestones))
//     .catch((error) => console.error("Milestone generation error:", error))
// );
