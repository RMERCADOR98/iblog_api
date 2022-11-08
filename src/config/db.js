import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// const connection = new Sequelize({
//   dialect: "sqlite",
//   storage: "./database.sqlite",
//   logging: false,
// });

const connection = new Sequelize(process.env.MYSQL_URL);

export default connection;
