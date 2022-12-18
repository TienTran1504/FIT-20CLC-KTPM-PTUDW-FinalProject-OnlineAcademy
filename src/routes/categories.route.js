import express from "express";
const categoriesRouter = express.Router();
import { renderCategories } from "../controllers/categories.controller";

categoriesRouter.route("/").get(renderCategories);

export default categoriesRouter;
