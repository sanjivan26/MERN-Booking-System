import { Request, Response } from "express";
import User from "../models/User";
import generateToken from "../utils/generateToken";

// @desc    Register user
// @route   POST /api/auth/register
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const user = await User.create({ name, email, password });
    const token = generateToken(user.id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("Request body:", req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not registered" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    if (user) {
      console.log("Password match:", await user.comparePassword(password));
    }
    const token = generateToken(user.id);
    console.log({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
