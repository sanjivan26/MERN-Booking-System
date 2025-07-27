import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";
import User from "../models/User";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", async (req, res) => {
  const users = await User.find(); // Hide password hash
  res.json(users);
});
export default router;
