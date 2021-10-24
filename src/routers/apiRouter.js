import express from "express";
import {
  addComment,
  registerView,
  deleteComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", addComment);
apiRouter.delete("/comments/:id([0-9a-f]{24})/delete", deleteComment);

export default apiRouter;
