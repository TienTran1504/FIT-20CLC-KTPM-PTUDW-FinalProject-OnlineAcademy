import express from "express";
import * as categories from "../controllers/categories.controller";

const categoriesRouter = express.Router();

categoriesRouter.route("/").get(categories.renderCategories);

categoriesRouter.route("/:category/:language/:page").get(categories.getCategory);

export default categoriesRouter;
