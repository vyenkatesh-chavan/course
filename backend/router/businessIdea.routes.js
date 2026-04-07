import express from "express";
import {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
} from "../controllers/business.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔐 PROTECTED
router.get("/", authMiddleware, getIdeas);
router.get("/:id", authMiddleware, getIdeaById);

// 🔐 PROTECTED
router.post("/", authMiddleware, createIdea);
router.put("/:id", authMiddleware, updateIdea);
router.delete("/:id", authMiddleware, deleteIdea);

export default router;