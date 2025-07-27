import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoute from "./routes/testroute";
import { connectDB } from "./config/connectDB";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/properties", propertyRoutes);
app.use("api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/test", testRoute);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
