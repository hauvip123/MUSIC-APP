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
  res.render("client/pages/songs/list", {
    pageTitle: topic?.title,
    songs: songs,
  });
};

// GET /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const detal: String = req.params.slugSong;
  const song = await Song.findOne({
    slug: detal,
    status: "active",
    deleted: false,
  });
  const singer = await Singer.findOne({
    _id: song?.singerId,
    status: "active",
    deleted: false,
  }).select("fullName");
  const topic = await Topic.findOne({
    _id: song?.topicId,
    status: "active",
    deleted: false,
  }).select("title");
  res.render("client/pages/songs/detail", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic,
  });
};
// GET /songs/like/:typelike/yes/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong: String = req.params.idSong;
  const typelike: String = req.params.typelike;
  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });
  if (!song) {
    return res.status(404).json({
      code: 404,
      message: "Bài hát không tồn tại",
    });
  }
  const newLike: number =
    typelike == "like" ? (song.like || 0) + 1 : (song.like || 0) - 1;
  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      like: newLike,
    }
  );
  res.json({
    code: 200,
    message: "Cảm ơn bạn đã thích bài hát này",
    like: newLike,
  });
};
