import { Group, User } from "../server";

export default (sequelize, Sequelize) => {
  const UserGroup = sequelize.define("userGroup", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    group_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  });
  return UserGroup;
};
