const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
require("dotenv").config();

// Initialize the GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Define the schema for the learning pathway
const schema = {
  description: "Structured learning pathway",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      field: {
        type: SchemaType.STRING,
        description:
          "The category or field of the learning pathway, e.g., Frontend Development, Backend Development",
        nullable: false,
      },
      skills: {
        type: SchemaType.ARRAY,
        description: "List of skills under the field",
        items: {
          type: SchemaType.OBJECT,
          properties: {
            skill: {
              type: SchemaType.STRING,
              description: "The specific skill, e.g., JavaScript, React",
              nullable: false,
            },
            description: {
              type: SchemaType.STRING,
              description:
                "A brief description of the skill and its importance",
              nullable: false,
            },
            prerequisites: {
              type: SchemaType.ARRAY,
              description:
                "List of prerequisites required for learning this skill",
              items: {
                type: SchemaType.STRING,
                description: "A prerequisite skill, e.g., HTML, CSS",
              },
              nullable: true,
            },
          },
          required: ["skill", "description"],
        },
      },
    },
    required: ["field", "skills"],
  },
};

// Function to get universal skills
async function getUniversalSkills(role, existingSkills) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Updated prompt with refined instructions
  const prompt = `I am planning to become proficient as a ${role}. 
My current skills are: ${existingSkills}.
Based on my role and existing skills, provide me with a comma-separated list of universal skills I should acquire to become proficient. 
Label skills I already have with '(Already Have)' and provide other skills in sequence of learning priority.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  // Return the formatted skills list
  return text;
}

// Function to get the learning path
async function getLearningPath(role, universalSkills) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  // Initialize the generative model with the schema
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: `You are a learning path architect specializing in designing comprehensive, step-by-step educational roadmaps. Your task is to:

  1. Generate a structured JSON object outlining learning fields and skills logically.
  2. Mark skills the user already has with \"(already have)\".
  3. Clearly define prerequisites for each skill or field, ensuring a logical progression.
  4. Provide a concise description of each skill and its relevance.

  Always organize the content by fields, ensure beginner-to-advanced progression, and follow the example format.`,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = `
You are an expert in designing structured learning paths. I want to become a ${role}, and ${universalSkills} represents a universal set of skills necessary to excel in this role. 
Your task is to generate a detailed JSON object representing the learning path.

### Desired Format:
[
  {
    "field": "Web Development Fundamentals",
    "skills": [
      {
        "skill": "HTML (already have)",
        "description": "Semantic HTML5, structuring web pages.",
        "prerequisites": []
      },
      {
        "skill": "CSS",
        "description": "Styling web pages, box model, selectors, responsive design.",
        "prerequisites": ["HTML"]
      },
      {
        "skill": "JavaScript",
        "description": "DOM manipulation, asynchronous programming, event handling.",
        "prerequisites": ["HTML", "CSS"]
      }
    ]
  },
  {
    "field": "Advanced Concepts",
    "skills": [
      {
        "skill": "API Integration",
        "description": "Fetching data from REST APIs using Fetch API or Axios.",
        "prerequisites": ["JavaScript"]
      }
    ]
  }
]

### Instructions:
1. Organize the skills by fields and subfields.
2. Label skills the user already has with "(already have)".
3. Indicate prerequisites for each skill or field where applicable.
4. Provide a brief description for each skill to guide the user.

### Your Output:
Follow the above format and include all necessary fields and subfields to guide a beginner to advanced level in ${role}.
Make sure the output is well-structured, and each skill logically flows into the next.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);

  return text;
}

module.exports = { getUniversalSkills, getLearningPath };
