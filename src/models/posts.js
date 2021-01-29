import { DataTypes } from "sequelize";
import sequelize from "sequelize";
import connection from "../config/db";

const Posts = connection.define(
  "posts",
  {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    timestamps: false,
    tableName: "posts",
  }
);

export default Posts;
