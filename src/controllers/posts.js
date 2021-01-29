import { Likes, Posts } from "../models/index";
import jwt from "jsonwebtoken";
import sequelize from "../config/db";

sequelize.sync();

const Create = (req, res) => {
  //se chegarmos ao controlar passamos pelo guarda, apenas falta ir buscar os valores do token, para depois utilizar com credencial

  jwt.verify(req.token, process.env.JWT_KEY, async (err, cred) => {
    if (err) {
      return res.sendStatus(403);
    }

    //buscar os dados do post
    const { title, description, content } = req.body;

    const data = await Posts.create({
      title: title,
      description: description,
      content: content,
      userId: cred.id, //foreign key que criei no index
    });
    return res.json(data);
  });
};

const FindAllOwned = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, async (err, cred) => {
    if (err) {
      return res.sendStatus(403);
    }

    const getAllOwned = await Posts.findAll({
      where: {
        userId: cred.id,
      },
    });

    return res.json(getAllOwned);
  });
};

const FindAll = async (req, res) => {
  //se o token tiver a author. e o token em si retorna true casso contrerio false
  const bearer =
    req.headers.authorization && req.headers.authorization.split(" ")[0];
  const user_cred = [];

  if (bearer) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, async (err, cred) => {
      if (err) {
        return res.sendStatus(403);
      }

      return user_cred.push(cred.id);
    });
  }
  if (user_cred.length >= 1) {
    const getAllPosts = await Posts.findAll();
    const getUserLikes = await Likes.findAll({
      where: {
        user_id: user_cred[0],
      },
    });
    const remap = getUserLikes.map((item) => item.post_id);
    return res.json({
      posts: getAllPosts,
      userLikes: remap,
    });
  }

  const getAll = await Posts.findAll();

  return res.json(getAll);
};

const FindOne = async (req, res) => {
  //   jwt.verify(req.token, process.env.JWT_KEY, async (err, cred) => {
  //     if (err) {
  //       return res.sendStatus(403);
  //     }
  //   });

  const { id } = req.params;

  const getOne = await Posts.findByPk(id);

  return res.json(getOne);
};

const Delete = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, async (err, cred) => {
    if (err) {
      return res.sendStatus(403);
    }

    const { id } = req.params;

    const post = await Posts.findByPk(id);
    // console.log({
    //   userId: post.userId,
    //   user: cred.id,
    // });

    if (post.userId === cred.id) {
      await Posts.destroy({
        where: {
          id: id,
        },
      });
      return res.sendStatus(200);
    }
    return res.json({
      status: 403,
    });
  });
};

const Update = (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, async (err, cred) => {
    if (err) {
      return res.sendStatus(403);
    }

    const { id } = req.params;

    const post = await Posts.findByPk(id);

    if (post.userId === cred.id) {
      await Posts.update(req.body, {
        where: {
          id: id,
        },
      });
      const newEdit = await Posts.findByPk(id);

      return res.json(newEdit);
    }
    return res.json({
      status: 403,
    });
  });
};

export { Create, FindAll, FindAllOwned, FindOne, Delete, Update };
