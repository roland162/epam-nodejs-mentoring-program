export default (sequelize, Sequelize) => {
  const Group = sequelize.define("group", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	permissions: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		allowNull: false,
	},
  });
  return Group;
};
