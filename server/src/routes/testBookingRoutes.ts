import { Router, Response } from "express";
import { protect, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

router.get("/my-bookings", protect, (req: AuthRequest, res: Response) => {
  res.json({ message: `Welcome, ${req.user?.name}. Here are your bookings.` });
});

export default router;
