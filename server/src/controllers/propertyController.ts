import { Request, Response } from "express";
import Property from "../models/Property";

// @desc Get all properties
// @route GET /api/properties
export const getProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

// @desc Add a new property
// @route POST /api/properties
export const addProperty = async (req: Request, res: Response) => {
  const { name, location, pricePerNight, description } = req.body;
  try {
    const property = await Property.create({
      name,
      location,
      pricePerNight,
      description,
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: "Failed to add property" });
  }
};

// @desc Update a property
// @route PUT /api/properties/:id
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Failed to update property" });
  }
};

// @desc Delete a property
// @route DELETE /api/properties/:id
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete property" });
  }
};
