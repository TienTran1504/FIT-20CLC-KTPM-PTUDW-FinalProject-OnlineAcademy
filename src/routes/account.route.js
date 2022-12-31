import express from "express";
const accountRouter = express.Router();
import {
  formRegister,
  addAccount,
  formLogin,
  checkLogin,
  logout,
} from "../controllers/account.controller.js";

accountRouter.route("/register").get(formRegister).post(addAccount);
//accountRouter.route("/register");
accountRouter.route("/login").get(formLogin).post(checkLogin);
//accountRouter.route("/login").post(checkLogin);
accountRouter.route("/logout").get(logout);

export default accountRouter;
