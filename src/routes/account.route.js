import express from 'express';
const accountRouter = express.Router();
import {formRegister, addAccount, formLogin, checkLogin, logout} from "../controllers/account.controller.js";

accountRouter.route('/register').post(addAccount)
accountRouter.route('/register').post(checkLogin)
accountRouter.route('/register').get(formRegister)
accountRouter.route('/login').get(formLogin)
accountRouter.route('/logout').get(logout)

export default accountRouter
