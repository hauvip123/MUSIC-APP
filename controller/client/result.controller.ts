import { Response, Request } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { converToSlug } from "../../helpers/converToSlug";
interface SearchQuery {
  keyword: string;
}
// GET : /search/:type
export const result = async (req: Request, res: Response) => {
  const type = req.params.type;
  const keyword = req.query.keyword as string;
  const newSong = [];
  if (keyword) {
    const songregex = new RegExp(keyword, "i");
    // Tạo ra slug không dấu và tạo thên dấu - ngăn cách
    const slug = converToSlug(keyword);
    const slugregex = new RegExp(slug, "i");
    const songs = await Song.find({
      $or: [{ title: songregex }, { slug: slugregex }],
    });
    for (const song of songs) {
      const infosinger = await Singer.findOne({
        _id: song.singerId,
      }).select("fullName");
      newSong.push({
        id: song._id,
        title: song.title,
        avatar: song.avatar,
        like: song.like,
        slug: song.slug,
        infoSinger: {
          fullName: infosinger?.fullName,
        },
      });
    }
  }
  switch (type) {
    case "result":
      res.render("client/pages/search/result", {
        pageTitle: `Kết quả tìm kiếm : ${keyword}`,
        searchSong: newSong,
      });
      break;
    case "suggest":
      res.json({
        code: 200,
        message: "Success",
        searchSong: newSong,
      });
      break;
    default:
      break;
  }
};
