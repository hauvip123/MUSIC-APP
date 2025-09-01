import { Request, Router, Response } from "express";
const route: Router = Router();
import Topic from "../../models/topic.model";
import { topics } from "../../controller/client/topic.controller";
export const topicRoute: Router = route.get("/", topics);
