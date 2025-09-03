import { Router } from "express";
import { list } from "../../controller/client/song.controller";
const route = Router();
export const songRoute: Router = route.get("/:slug", list);
