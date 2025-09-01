import { Response, Request } from "express";
import Topic from "../../models/topic.model";

// GET /topics
export const topics = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    delete: false,
  });
  console.log(topics);
  res.render("client/pages/topics/index", {
    pageTitle: "Trang chủ bài hát",
  });
};
