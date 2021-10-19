import express from "express";

const videoRouter = express.Router();

videoRouter.get("/:id(\\+d)");
videoRouter.get("/:id(\\+d)/edit");
videoRouter.get("/:id(\\+d)/delete");
videoRouter.get("/upload");

export default videoRouter;
