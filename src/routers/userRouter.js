import express from "express";
import {
  callbackGithubLogin,
  getChangePassword,
  getEdit,
  githubLogin,
  logout,
  postChangePassword,
  postEdit,
  see,
} from "../controllers/userController";
import { privateOnly, publicOnly, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(privateOnly)
  .get(getEdit)
  .post(uploadAvatar, postEdit);
userRouter
  .route("/change-password")
  .all(privateOnly)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github", publicOnly, githubLogin);
userRouter.get("/github/callback", publicOnly, callbackGithubLogin);
userRouter.get("/logout", privateOnly, logout);
userRouter.get(":id", see);

export default userRouter;
