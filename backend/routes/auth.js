import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

// REGISTER
authRouter.post("/register", async (req, res) => {
  let { username, email, password, confirmPassword } = req.body;
  try {
    // Validate input
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Trim inputs to prevent accidental spaces
    username = username.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    // Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ msg: "Email already exists" });
      }
      if (existingUser.username === username) {
        return res.status(409).json({ msg: "Username already exists" });
      }
    }

    // Password length check
    if (password.length < 6 || password.length > 30) {
      return res
        .status(400)
        .json({ msg: "Password must be between 6 and 30 characters" });
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // Response (excluding password)
    const userResponse = {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
    };

    // Create jwt token
    const token = jwt.sign(
      { id: userResponse.id, isAdmin: userResponse.isAdmin },
      process.env.JWT_SECRETKEY, // Secret key
      { expiresIn: "2h" } // JWT expiration time
    );

    res.status(201).json({
      msg: "User has been successfully created",
      user: userResponse,
      token: token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ msg: "Failed to register user" });
  }
});

// LOGIN
authRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Trim inputs
    email = email.trim();
    password = password.trim();

    // Check email and password
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({ msg: "Invalid Email or Password" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(403).json({ msg: "Invalid Email or Password" });
    }

    // Excluding password
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    // Create jwt token
    const token = jwt.sign(
      { id: userResponse.id, isAdmin: userResponse.isAdmin },
      process.env.JWT_SECRETKEY, // Secret key
      { expiresIn: "2h" } // JWT expiration time
    );

    // Response
    res.status(200).json({
      msg: "Login successful",
      user: userResponse,
      token: token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ msg: "Failed to log in" });
  }
});

export default authRouter;
