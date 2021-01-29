import { Users } from "../models/index";
import sequelize from "../config/db";
import bcrypt from "bcrypt"; // para fazer o hash da pass
import jwt from "jsonwebtoken";

sequelize.sync();

const SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  //fetch ao backend para verificar se o user já existe
  const userExists = await Users.findOne({
    where: {
      email: email,
    },
  });
  console.log(userExists);
  if (userExists) {
    return res.json({
      status: 500,
    });
  }

  //hash (encriptar) a password
  const hashed = bcrypt.hashSync(password, 10);

  //criar o utilizador
  const create = await Users.create({
    email: email,
    password: hashed,
    username: username,
  });
  return res.json(create);
};

const SignIn = async (req, res) => {
  const { email, password, id } = req.body;

  //verificar se o user já existe
  const userExists = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (!userExists) {
    return res.json({
      status: 500,
    });
  }

  //verificar se a password que foi iserida coincide com a que foi guardada na base de dados

  const validate = bcrypt.compareSync(password, userExists.password);

  if (!validate) {
    return res.json({
      status: 500,
    });
  }

  const token = jwt.sign(
    {
      id: userExists.id,
    },
    process.env.JWT_KEY
  );
  return res.json({
    token: token,
    username: userExists.username,
    id: userExists.id,
  });
};

export { SignUp, SignIn };
