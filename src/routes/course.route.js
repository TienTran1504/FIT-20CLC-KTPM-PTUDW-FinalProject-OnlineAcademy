import express from "express";
const coursesRouter = express.Router();

import { getAllCourses, getCourse } from "../controllers/course.controller";

coursesRouter.route("/").get(getAllCourses);
// coursesRouter.route("/:id").get(getCourse);
coursesRouter.route("/test").get(getCourse);

export default coursesRouter;
