import { Express } from "express";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
import { favoriteSong } from "./favorite-songs.route";
export default function clientRoute(app: Express): void {
  app.use("/topics", topicRoute);
  app.use("/songs", songRoute);
  app.use("/favorite-songs", favoriteSong);
}
