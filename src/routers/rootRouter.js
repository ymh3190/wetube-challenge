import express from "express";
import {
  getSignin,
  getSignup,
  postSignin,
  postSignup,
} from "../controllers/userController";
import { index, search } from "../controllers/videoController";
import { publicOnly } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", index);
rootRouter.route("/signup").all(publicOnly).get(getSignup).post(postSignup);
rootRouter.route("/signin").all(publicOnly).get(getSignin).post(postSignin);
rootRouter.get("/search", search);

export default rootRouter;
