import express from "express";
const coursesRouter = express.Router();

import {
  getAllCourses,
  getCourse,
  viewLecture,
  addFeedback,
} from "../controllers/course.controller";

// coursesRouter.route("/").get(getAllCourses);
coursesRouter.route("/:id").get(getCourse);
coursesRouter.route("/learn/:idlecture").get(viewLecture);
coursesRouter.route("/feedback_course/post/:idlecture").post(addFeedback);

export default coursesRouter;
