import mongoose, { Schema } from "mongoose";

const songSchema = new Schema(
  {
    title: String,
    avatar: String,
    description: String,
    isFavoriteSong: Boolean,
    singerId: String,
    topicId: String,
    like: Number,
    lyrics: String,
    audio: String,
    status: String,
    slug: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
    infoSinger: {
      type: Object, // Sử dụng Object để lưu thông tin ca sĩ (có thể mở rộng)
      default: null, // Mặc định là null nếu chưa có thông tin ca sĩ
    },
  },
  {
    timestamps: true,
  }
);
const Song = mongoose.model("Song", songSchema, "songs");
export default Song;
