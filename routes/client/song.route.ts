import { Router } from "express";
import {
  detail,
  favorite,
  like,
  list,
} from "../../controller/client/song.controller";
const route = Router();
route.get("/:slug", list);
route.get("/detail/:slugSong", detail);
route.patch("/like/:typelike/:idSong", like);
route.patch("/favorite/:typefavorite/:idSong", favorite);
export const songRoute: Router = route;
