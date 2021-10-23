import express from "express";
import {
  callbackGithubLogin,
  getEdit,
  githubLogin,
  logout,
  postEdit,
  see,
} from "../controllers/userController";
import { uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/edit").get(getEdit).post(uploadAvatar, postEdit);
userRouter.get("/change-password");
userRouter.get("/github", githubLogin);
userRouter.get("/github/callback", callbackGithubLogin);
userRouter.get("/logout", logout);
userRouter.get(":id", see);

export default userRouter;
