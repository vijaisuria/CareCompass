const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authRoutes = require("../routes/authRoutes");
const User = require("../models/User");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

describe("POST /auth/login", () => {
  let server;
  let user;

  beforeAll(async () => {
    server = app.listen(4000);
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    user = new User({
      name: "Test User",
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10),
    });

    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  it("should return 400 if user is not found", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "nonexistent@example.com", password: "password123" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User not found");
  });

  it("should return 400 if password is invalid", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid credentials");
  });

  it("should return 200 and a token if login is successful", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
    expect(res.body).toHaveProperty("token");

    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
    expect(decoded.id).toBe(user._id.toString());
  });
});
