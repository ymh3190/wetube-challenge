import express from "express";

const userRouter = express.Router();

userRouter.get("/:id(\\+d)");
userRouter.get("/edit");
userRouter.get("/:id(\\+d)/change-password");
userRouter.get("/logout");

export default userRouter;
