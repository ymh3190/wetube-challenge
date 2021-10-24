import express from "express";
import {
  deleteVideo,
  getEdit,
  getUpload,
  postEdit,
  postUpload,
  watch,
} from "../controllers/videoController";
import { privateOnly, videoMulter } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(privateOnly)
  .get(getEdit)
  .post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
videoRouter
  .route("/upload")
  .all(privateOnly)
  .get(getUpload)
  .post(videoMulter.single("video"), postUpload);

export default videoRouter;
