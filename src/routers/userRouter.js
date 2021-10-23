import express from "express";
import {
  callbackGithubLogin,
  githubLogin,
  logout,
  see,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit");
userRouter.get("/:id(\\+d)/change-password");
userRouter.get("/github", githubLogin);
userRouter.get("/github/callback", callbackGithubLogin);
userRouter.get("/logout", logout);
userRouter.get(":id", see);

export default userRouter;
