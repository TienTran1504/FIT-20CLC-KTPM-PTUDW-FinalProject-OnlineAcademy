import express from "express";
const coursesRouter = express.Router();

import {
  getAllCourses,
  getCourse,
  viewLecture,
} from "../controllers/course.controller";

// coursesRouter.route("/").get(getAllCourses);
coursesRouter.route("/:id").get(getCourse);
coursesRouter.route("/test").get(getCourse);
coursesRouter.route("/learn/:idcourse/:idlecture").get(viewLecture);

export default coursesRouter;
