import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ SIGNUP USER
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("BODY:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashpassword
    });

    res.status(201).json({
      message: "User registered successfully ✅",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ LOGIN USER (UPDATED)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "7d" }
    );

    // 🔥 FINAL FIX HERE
    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,   // ✅ MUST BE _id
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};