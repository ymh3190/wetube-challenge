import express from "express";
import { index } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", index);
rootRouter.get("/join");
rootRouter.get("/login");
rootRouter.get("/search");

export default rootRouter;
