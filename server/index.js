// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const logRoutes = require("./routes/logRoutes");
const goalRoutes = require("./routes/goalRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// CORS
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/roadmap", roadmapRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
