import express from "express";
import {
  getSignin,
  getSignup,
  postSignin,
  postSignup,
} from "../controllers/userController";
import { index, search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", index);
rootRouter.route("/signup").get(getSignup).post(postSignup);
rootRouter.route("/signin").get(getSignin).post(postSignin);
rootRouter.get("/search", search);

export default rootRouter;
