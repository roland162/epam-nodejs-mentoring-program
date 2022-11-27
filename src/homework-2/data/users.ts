import {v4 as uuid} from "uuid";
import { User } from "../types";

export const users: User[] = [
  {
    id: uuid(),
    login: "user1",
    password: "password1",
    age: 20,
    isDeleted: false,
  },
  {
	id: uuid(),
	login: "user2",
	password: "password2",
	age: 20,
	isDeleted: false,
  }
];
