import { Response, Request } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// GET /songs/:slug
export const list = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slug,
    status: "active",
    deleted: false,
  });
  const songs = await Song.find({
    topicId: topic?.id,
    status: "active",
    deleted: false,
  });
  for (const song of songs) {
    const singer = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    });
    song["infoSinger"] = singer;
  }
  console.log(songs);
  res.render("client/pages/songs/list", {
    pageTitle: topic?.title,
    songs: songs,
  });
};
