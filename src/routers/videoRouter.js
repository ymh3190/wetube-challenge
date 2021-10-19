import express from "express";

const videoRouter = express.Router();

videoRouter.get("/:id");
videoRouter.get("/:id/edit");
videoRouter.get("/:id/delete");
videoRouter.get("/upload");

export default videoRouter;
