import express from "express";
import {
  registerUser,
  registerAdmin,
  loginUser,
  getProfile,
  toggleSaveItem,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateRegister, validateLogin } from "../middleware/validator.middleware.js";

const router = express.Router();

// 🔓 PUBLIC
router.post("/register", validateRegister, registerUser);
router.post("/register-admin", validateRegister, registerAdmin);
router.post("/login", validateLogin, loginUser);

// 🔐 PROTECTED
router.get("/profile", authMiddleware, getProfile);
router.post("/save-item", authMiddleware, toggleSaveItem);

export default router;