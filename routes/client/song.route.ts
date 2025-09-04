import { Router } from "express";
import { detail, list } from "../../controller/client/song.controller";
const route = Router();
route.get("/:slug", list);
route.get("/detail/:slugSong", detail);
export const songRoute: Router = route;
