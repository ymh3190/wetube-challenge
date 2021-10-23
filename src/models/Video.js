import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  file: { type: String, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
