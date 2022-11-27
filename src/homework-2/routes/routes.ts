import express from "express";
import {
  createUser,
  deleteUser,
  getAutoSuggestUsers,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController";

export const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/auto-suggest", getAutoSuggestUsers);
