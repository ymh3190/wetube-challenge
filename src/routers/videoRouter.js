import express from "express";
import { getUpload, postUpload } from "../controllers/videoController";
import { privateOnly, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id(\\+d)");
videoRouter.route("/:id(\\+d)/edit").all(privateOnly);
videoRouter.route("/:id(\\+d)/delete").all(privateOnly);
videoRouter
  .route("/upload")
  .all(privateOnly)
  .get(getUpload)
  .post(uploadVideo, postUpload);

export default videoRouter;
