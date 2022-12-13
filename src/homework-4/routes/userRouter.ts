import Router from "express-promise-router";
import {
  createUser,
  deleteUser,
  getAutoSuggestUsers,
  getUserById,
  getUsers,
  updateUser,
  userLogin,
} from "../controllers/userController";

export const userRouter = Router();
userRouter.get("/auto-suggest", getAutoSuggestUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/", getUsers);
userRouter.post("/login", userLogin);


