import { Response } from "express";
import Booking from "../models/Booking";
import Property from "../models/Property";
import { AuthRequest } from "../middleware/authMiddleware";

// @desc    Create a new booking
// @route   POST /api/bookings
export const createBooking = async (req: AuthRequest, res: Response) => {
  const { propertyId, startDate, endDate } = req.body;

  if (!propertyId || !startDate || !endDate) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ error: "Property not found" });

    // Calculate total price
    const days =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24);
    const totalPrice = property.pricePerNight * days;

    const booking = await Booking.create({
      user: req.user?.id,
      property: propertyId,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
};

// @desc    Get all bookings for logged-in user
// @route   GET /api/bookings/my-bookings
export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user?.id }).populate(
      "property"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
