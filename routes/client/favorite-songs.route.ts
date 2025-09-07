import { Router } from "express";
const route = Router();
import * as favoriteSongController from "../../controller/client/favorite-songs.controller";
route.get("/", favoriteSongController.index);
export const favoriteSong: Router = route;
