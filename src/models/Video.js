import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
  ],
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
