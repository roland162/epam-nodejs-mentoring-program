import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { StatusCodes } from 'http-status-codes';
import { validationResult } from "express-validator";
import { users } from "../data/users";

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send("User not found");
  } else {
    res.status(StatusCodes.OK).send(user);
  }
};

export const createUser = (req: Request, res: Response) => {
	console.log(req);
  const { login, password, age } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).send.json({errors: errors.array()});
  } else {
    const user = {
      id: uuid(),
      login,
      password,
      age,
      isDeleted: false,
    };
    users.push(user);
    res.status(StatusCodes.OK).json(user);
  }
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { login, password, age } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
	res.status(StatusCodes.BAD_REQUEST).send.json({errors: errors.array()});
  } else {
	const user = users.find((user) => user.id === id);
	if (!user) {
	  res.status(StatusCodes.NOT_FOUND).send("User not found");
	} else {
	  user.login = login;
	  user.password = password;
	  user.age = age;
	  res.status(StatusCodes.OK).json(user);
	}
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const user = users.find((user) => user.id === id);
  if (!user) {
	res.status(StatusCodes.NOT_FOUND).send("User not found");
  } else {
	user.isDeleted = true;
	res.status(StatusCodes.OK).json(user);
  }
};

export const getAutoSuggestUsers = (req: Request, res: Response) => {
  const { loginSubstring, limit } = req.query;
  const usersList = users
	.filter((user) => user.login.includes(loginSubstring))
	.sort((a, b) => a.login.localeCompare(b.login))
	.slice(0, limit);
  res.status(StatusCodes.OK).json(usersList);
};

export const getUsers = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(users);
};
