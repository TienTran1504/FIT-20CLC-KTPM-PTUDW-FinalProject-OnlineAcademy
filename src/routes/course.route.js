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
coursesRouter.route("/learn/:idlecture").get(viewLecture).post(addFeedback);
// coursesRouter.route("/add_feedback/post").post(addFeedback);

export default coursesRouter;
