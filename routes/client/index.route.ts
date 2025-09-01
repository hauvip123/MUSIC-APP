import { Express } from "express";
import { topicRoute } from "./topic.route";
export default function clientRoute(app: Express): void {
  app.use("/topics", topicRoute);
}
