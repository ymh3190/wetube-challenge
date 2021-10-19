import express from "express";

const userRouter = express.Router();

userRouter.get("/:id");
userRouter.get("/edit");
userRouter.get("/:id/change-password");
userRouter.get("/logout");

export default userRouter;
