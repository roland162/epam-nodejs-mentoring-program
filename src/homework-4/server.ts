import express from "express";
import { userRouter } from "./routes/userRouter";
import cors from "cors";
import { sequelize } from "./config/database";
import { groupRouter } from "./routes/groupRouter";
import createGroupModel from "./models/createGroupModel";
import { Sequelize } from "sequelize";
import createUserModel from "./models/createUserModel";
import createUserGroupModel from "./models/createUserGroupModel";

const app = express();
const port = process.env.PORT || 4200;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());
app.use("/users", userRouter);
app.use("/groups", groupRouter);

export const Group = createGroupModel(sequelize, Sequelize);
export const User = createUserModel(sequelize, Sequelize);
export const UserGroup = createUserGroupModel(sequelize, Sequelize);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

sequelize
  .sync()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
