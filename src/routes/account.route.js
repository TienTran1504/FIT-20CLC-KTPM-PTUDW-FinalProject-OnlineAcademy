import express from "express";
const accountRouter = express.Router();
import {
  formRegister,
  sendMail,
  createUser,
  formLogin,
  checkLogin,
  getOTP,
  isCorrectOTP,
  logout,
  checkAvailableEmail,
} from "../controllers/account.controller.js";

accountRouter.route("/register/success").get(createUser);
accountRouter.route("/register").get(formRegister).post(sendMail);
accountRouter.route("/login").get(formLogin).post(checkLogin);
accountRouter.route("/otp").get(isCorrectOTP);
accountRouter.route("/logout").get(logout);
accountRouter.route("/is-available").get(checkAvailableEmail);

export default accountRouter;
