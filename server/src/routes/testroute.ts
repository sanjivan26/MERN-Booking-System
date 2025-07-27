import { Router } from "express";
import User from "../models/User";

const router = Router();

// GET /api/test
router.get("/", async (req, res) => {
  try {
    // Create a test user (just for checking DB)
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
    });
    return res.json({ message: "User created", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error connecting to database" });
  }
});

export default router;
