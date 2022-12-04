import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { dataBaseQuery } from "../config/database";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await dataBaseQuery("SELECT * FROM users WHERE id = $1", [
    id,
  ]);
  const user = rows?.find((user) => user.id === id);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send("User not found");
  } else {
    res.status(StatusCodes.OK).send(user);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { login, password, age } = req.body;
  const errors = validationResult(req);
  if (!login || !password || !age) {
    res.status(StatusCodes.BAD_REQUEST).send("Bad request");
  }
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).send.json({ errors: errors.array() });
  } else {
    const generatedID = uuid();
    await dataBaseQuery(
      "INSERT INTO users (id, login, password, age, isDeleted) VALUES ($1, $2, $3, $4, $5)",
      [generatedID, login, password, age, false]
    );
    res
      .status(StatusCodes.OK)
      .json({ id: generatedID, login, password, age, isDeleted: false });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { login, password, age } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).send.json({ errors: errors.array() });
  } else {
    const { rows } = await dataBaseQuery("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows?.find((user) => user.id === id);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).send("User not found");
    } else {
      const newUser = {
        id,
        login: login || user.login,
        password: password || user.password,
        age: age || user.age,
        isDeleted: user.isDeleted,
      };
      await dataBaseQuery(
        "UPDATE users SET login = $1, password = $2, age = $3, isDeleted = $4 WHERE id = $5",
        [
          newUser.login,
          newUser.password,
          newUser.age,
          newUser.isDeleted,
          newUser.id,
        ]
      );
      res.status(StatusCodes.OK).json(newUser);
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await dataBaseQuery("SELECT * FROM users WHERE id = $1", [
    id,
  ]);
  const user = rows?.find((user) => user.id === id);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send("User not found");
  } else {
    await dataBaseQuery("UPDATE users SET isDeleted = $1 WHERE id = $2", [
      true,
      id,
    ]);

    const {rows: newUser} = await dataBaseQuery("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.status(StatusCodes.OK).json(newUser[0]);
  }
};

export const getAutoSuggestUsers = async (req: Request, res: Response) => {
  const { loginSubstring, limit } = req.query;
  console.log(req.query);
  const { rows: users } = await dataBaseQuery(
    "SELECT * FROM users WHERE login LIKE $1",
    [`%${loginSubstring}%`]
  );

  const userList = users.slice(0, limit);
  if (users.length) {
    res.status(StatusCodes.OK).json(userList);
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Users not found for this query");
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const { rows: users } = await dataBaseQuery("SELECT * FROM users", []);
  res.status(StatusCodes.OK).json(users);
};
