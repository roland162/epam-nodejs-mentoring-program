import Router from "express-promise-router";
import {
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup,
  addUserToGroup,
} from "../controllers/groupController";

export const groupRouter = Router();
groupRouter.get("/:id", getGroupById);
groupRouter.post("/", createGroup);
groupRouter.put("/:id", updateGroup);
groupRouter.delete("/:id", deleteGroup);
groupRouter.get("/", getGroups);
groupRouter.post('/add-user', addUserToGroup);
