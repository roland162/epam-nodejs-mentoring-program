import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { Op } from "sequelize";

import { User, Group } from "../server";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
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
    await User.create({
      id: generatedID,
      login,
      password,
      age,
      isDeleted: false,
    });
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
    const user = await User.findByPk(id);
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
      await User.update(newUser, { where: { id } });
      res.status(StatusCodes.OK).send(newUser);
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send("User not found");
  } else {
    await User.update({ isDeleted: true }, { where: { id } });
    res.status(StatusCodes.OK).send("User deleted");
  }
};

export const getAutoSuggestUsers = async (req: Request, res: Response) => {
  const { loginSubstring, limit } = req.query;
  const users = await User.findAll({
    where: {
      login: {
        [Op.like]: `%${loginSubstring}%`,
      },
    },
    limit: +limit,
  });
  res.status(StatusCodes.OK).send(users);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.status(StatusCodes.OK).send(users);
};
