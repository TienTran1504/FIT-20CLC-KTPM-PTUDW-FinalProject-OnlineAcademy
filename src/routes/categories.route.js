import express from "express";
import * as categories from "../controllers/categories.controller";

const categoriesRouter = express.Router();

categoriesRouter.route("/").get(categories.getCategory);

categoriesRouter.route("/search").get(categories.search);

export default categoriesRouter;
