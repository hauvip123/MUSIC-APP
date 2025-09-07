import { Response, Request } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
// GET /favorite-songs
export const index = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find({ deleted: false });
  const favorites = [];
  for (const favoriteSong of favoriteSongs) {
    const favorite = await Song.findOne({
      _id: favoriteSong.songId,
      status: "active",
      deleted: false,
    });
    const infosinger = await Singer.findOne({
      _id: favorite?.singerId,
      status: "active",
      deleted: false,
    }).select("fullName");
    if (favorite) {
      favorite["infoSinger"] = infosinger;
    }
    favorites.push(favorite);
  }
  res.render("client/pages/favorite-songs/index", {
    pageTitle: "Bài hát yêu thích",
    favorites: favorites,
  });
};
