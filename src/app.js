import express from "express";
import cors from "cors";
import helmet from "helmet"; //utilizando os JWt enviamos as infos através dos headers , portanto o helmet vai proteger estes dados
import morgan from "morgan"; // serve para fazer logs, sempre que acedemos a um endpoint diz que tipo de método foi utilizado etc..

import authRouter from "./router/auth";
import postsRouter from "./router/posts";
import likesRouter from "./router/likes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/likes", likesRouter);

export default app;
