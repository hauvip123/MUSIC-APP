import { Response, Request } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { converToSlug } from "../../helpers/converToSlug";
interface SearchQuery {
  keyword: string;
}
// GET : /search/result
export const result = async (req: Request, res: Response) => {
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
      song["infoSinger"] = infosinger;
    }
    newSong.push(...songs);
  }
  res.render("client/pages/search/result", {
    pageTitle: `Kết quả tìm kiếm : ${keyword}`,
    searchSong: newSong,
  });
};
