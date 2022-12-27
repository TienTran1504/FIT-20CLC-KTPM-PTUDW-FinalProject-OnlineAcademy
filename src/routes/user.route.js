import express from "express";
const userRouter = express.Router();
import { updatePassword, getUserInfor } from "../controllers/user.controller";

userRouter.route("/").get(getUserInfor);
userRouter.route("/update-password/post").post(updatePassword);

export default userRouter;
