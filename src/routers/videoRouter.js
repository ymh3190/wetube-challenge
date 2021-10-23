import express from "express";
import { getUpload, postUpload } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id(\\+d)");
videoRouter.get("/:id(\\+d)/edit");
videoRouter.get("/:id(\\+d)/delete");
videoRouter.route("/upload").get(getUpload).post(uploadVideo, postUpload);

export default videoRouter;
