import { DataTypes } from "sequelize";
import sequelize from "sequelize";
import connection from "../config/db";

const Likes = connection.define(
  "likes",
  {
    post_id: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
    tableName: "likes",
  }
);

export default Likes;
