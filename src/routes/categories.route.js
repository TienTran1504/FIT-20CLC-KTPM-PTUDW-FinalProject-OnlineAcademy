import express from "express";
import * as categories from "../controllers/categories.controller";

const categoriesRouter = express.Router();

categoriesRouter
  .route("/:category/:language/:page")
  .get(categories.getCategory);

categoriesRouter.route("/:category/:page").get(categories.getCategory);

export default categoriesRouter;
