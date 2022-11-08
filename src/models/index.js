import Users from "./users";
import Posts from "./posts";
import Likes from "./likes";

Users.hasMany(Posts, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    as: "posts",
  },
});

Posts.belongsTo(Users, {
  onDelete: "CASCADE", //AO FAZER DELETE DO USER, APAGA TODOS OS POSTS
  foreignKey: {
    name: "userId",
    allowNull: false,
    as: "users",
  },
});

export { Users, Posts, Likes };
