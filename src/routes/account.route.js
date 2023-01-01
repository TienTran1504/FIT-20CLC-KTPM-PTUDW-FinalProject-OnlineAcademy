import express from "express";
const accountRouter = express.Router();
import {
  formRegister,
  addAccount,
  formLogin,
  checkLogin,
  checkOTP,
  logout,
} from "../controllers/account.controller.js";

accountRouter.route("/register").get(formRegister).post(addAccount);
accountRouter.route("/login").get(formLogin).post(checkLogin);
//accountRouter.route("/register");
accountRouter.route("/otp").post(checkOTP);
//accountRouter.route("/login").post(checkLogin);
accountRouter.route("/logout").get(logout);

export default accountRouter;
