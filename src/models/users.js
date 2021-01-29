import { DataTypes } from "sequelize";
import connection from "../config/db";

const Users = connection.define(
  "users",
  {
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

export default Users;
