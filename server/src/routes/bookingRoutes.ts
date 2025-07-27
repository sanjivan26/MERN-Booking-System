import { Router } from "express";
import { createBooking, getMyBookings } from "../controllers/bookingController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);

export default router;
