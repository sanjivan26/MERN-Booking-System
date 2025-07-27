import { Router } from "express";
import {
  getProperties,
  addProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getProperties);
router.post("/", protect, addProperty);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

export default router;
