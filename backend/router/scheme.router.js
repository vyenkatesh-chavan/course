import express from "express";
import {
  createScheme,
  getSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme,
} from "../controllers/scheme.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getSchemes);
router.get("/:id", getSchemeById);

router.post("/", authMiddleware, authorizeRole("admin"), createScheme);
router.put("/:id", authMiddleware, authorizeRole("admin"), updateScheme);
router.delete("/:id", authMiddleware, authorizeRole("admin"), deleteScheme);

export default router;