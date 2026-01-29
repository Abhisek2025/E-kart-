import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";

import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔐 Security & performance middleware
app.use(helmet());
app.use(compression());
app.use(cors());

// 🧠 Body parser
app.use(express.json({ limit: "10kb" }));

// 📦 Routes
app.use("/api/v1/user", userRoute);

// 🩺 Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

// 🚀 Start server AFTER DB connects
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
