import express from "express";
import { renderHome } from "../controllers/home.controller";

const homeRouter = express.Router();

homeRouter.route("/").get(renderHome);

export default homeRouter;
