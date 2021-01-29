import { Likes, Posts } from "../models/index";
import jwt from "jsonwebtoken";
import sequelize from "../config/db";

sequelize.sync();

const LikePost = (req, res) => {
  //se chegarmos ao controlar passamos pelo guarda, apenas falta ir buscar os valores do token, para depois utilizar com credencial

  jwt.verify(req.token, process.env.JWT_KEY, async (err, cred) => {
    if (err) {
      return res.sendStatus(403);
    }
    //buscar o id do post
    const { id } = req.params;
    //converter para integer
    const convId = Number(id);
    //array vazio
    const givenPost = [];
    //adicionar o id do post
    givenPost.push(convId);

    //buscar o post
    //Pk = primary key
    const post = await Posts.findByPk(id);
    //tabela dos likes vuscar todos os likes do user
    const userLikes = await Likes.findAll({
      where: {
        user_id: cred.id,
      },
    });
    //fomos ao array do user likes e fomos a cada objeto buscar o post_id, ficando com um array
    const remap = userLikes.map((item) => item.post_id);
    //o some serve para fazer um validaçao entre dois arrays ( neste caso tinhamos o array dos likes do user e tinhamos o array do post que queriamos validar, comparando entre os dois -> true or false  )
    const validation = givenPost.some((item) => remap.includes(item));
    // console.log(remap, givenPost, validation);

    //se o post nao existe ou se o user já deu like
    if (!post || validation) {
      return res.sendStatus(500);
    }
    //vamos fazer increment por 1, caso o if nao se verifique
    await post.increment("likes", { by: 1 });

    await Likes.create({
      post_id: id,
      user_id: cred.id,
    });
    const newLiked = await Likes.findAll({
      where: {
        user_id: cred.id,
      },
    });
    const newRemap = newLiked.map((item) => item.post_id);
    return res.json(newRemap);
  });
};

const disLikePost = (req, res) => {
  //se chegarmos ao controlar passamos pelo guarda, apenas falta ir buscar os valores do token, para depois utilizar com credencial

  jwt.verify(req.token, process.env.JWT_KEY, async (err, cred) => {
    if (err) {
      return res.sendStatus(403);
    }
    //buscar o id do post
    const { id } = req.params;
    const convId = Number(id);
    const givenPost = [];
    givenPost.push(convId);
    //buscar o post
    //Pk = primary key
    const post = await Posts.findByPk(id);

    const userLikes = await Likes.findAll({
      where: {
        user_id: cred.id,
      },
    });

    const remap = userLikes.map((item) => item.post_id);

    const validation = givenPost.some((item) => remap.includes(item));

    //verificar se existe
    if (!post || !validation) {
      return res.sendStatus(500);
    }
    //vamos fazer decrement por 1
    await post.decrement("likes", { by: 1 });

    await Likes.destroy({
      where: {
        post_id: id,
        user_id: cred.id,
      },
    });
    const newLiked = await Likes.findAll({
      where: {
        user_id: cred.id,
      },
    });
    const newRemap = newLiked.map((item) => item.post_id);
    return res.json(newRemap);
  });
};

export { LikePost, disLikePost };
