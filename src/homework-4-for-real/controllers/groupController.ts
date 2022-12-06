import { v4 as uuid } from "uuid";
import { validationResult } from "express-validator";
import { Group, User } from "../server";


export const getGroupById = async (req, res) => {
  const { id } = req.params;
  const group = await Group.findByPk(id);
  if (!group) {
    res.status(404).send("Group not found");
  } else {
    res.status(200).send(group);
  }
};

export const createGroup = async (req, res) => {
  const { name, permissions } = req.body;
  const errors = validationResult(req);
  console.log(req.body);
  if (!name || !permissions) {
    res.status(400).send("Bad request");
  }
  if (!errors.isEmpty()) {
    res.status(400).send.json({ errors: errors.array() });
  } else {
    const generatedID = uuid();
    await Group.create({
      id: generatedID,
      name,
      permissions,
      userIds: [],
    });
    res.status(200).json({ id: generatedID, name, permissions });
  }
};

export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send.json({ errors: errors.array() });
  } else {
    const group = await Group.findByPk(id);
    if (!group) {
      res.status(404).send("Group not found");
    } else {
      const newGroup = {
        id,
        name: name || group.name,
        permissions: permissions || group.permissions,
        userIds: group.userIds,
      };
      await Group.update(newGroup, { where: { id } });
      res.status(200).send(newGroup);
    }
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const group = await Group.findByPk(id);
  if (!group) {
    res.status(404).send("Group not found");
  } else {
    await Group.destroy({ where: { id } });
    res.status(200).send("Group deleted");
  }
};

export const getGroups = async (req, res) => {
  const groups = await Group.findAll();
  res.status(200).send(groups);
};

export const addUserToGroup = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const group = await Group.findByPk(id);
  if (!group) {
    res.status(404).send("Group not found");
  } else {
    const newGroup = {
      id,
      name: group.name,
      permissions: group.permissions,
      userIds: [...group.userIds, userId],
    };
    await Group.update(newGroup, { where: { id } });
    res.status(200).send(newGroup);
  }
}
