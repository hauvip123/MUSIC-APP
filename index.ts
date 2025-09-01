import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import clientRoute from "./routes/client/index.route";
const app: Express = express();
const port: number | string = process.env.PORT || 3000;
dotenv.config();
database.connect();
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

clientRoute(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
