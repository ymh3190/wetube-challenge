import express from "express";
import { index } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", index);

export default rootRouter;
