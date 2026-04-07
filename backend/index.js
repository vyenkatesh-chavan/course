import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// routes
import userRoutes from "./router/user.router.js";
import skillRoutes from "./router/skill.router.js";
import schemeRoutes from "./router/scheme.router.js";
import ideaRoutes from "./router/businessIdea.routes.js";
import recommendationRoutes from "./router/recommendation.router.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// routes
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/recommendations", recommendationRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// error handling
app.use(notFound);
app.use(errorHandler);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});