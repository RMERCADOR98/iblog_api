import app from "./app";
import dotenv from "dotenv"; //para utilizar as variáveis ambiente de uma app em node

dotenv.config();

const port = process.env.PORT || 3002;

app.listen(port);
