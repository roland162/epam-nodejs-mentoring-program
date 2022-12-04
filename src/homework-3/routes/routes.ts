import Router from "express-promise-router";
import {
  createUser,
  deleteUser,
  getAutoSuggestUsers,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController";

export const router = Router();
router.get("/auto-suggest", getAutoSuggestUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getUsers);


