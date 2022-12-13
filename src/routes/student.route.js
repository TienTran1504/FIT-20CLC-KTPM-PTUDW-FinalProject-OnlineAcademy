import express from "express";
const studentRouter = express.Router();

import {
  addCourse,
  getCourseList,
  removeCourse,
  updateStatusCourse,
} from "../controllers/student.controller";

studentRouter.route("/profile").get(getCourseList);
studentRouter
  .route("/courses/:courseId")
  .patch(updateStatusCourse)
  .post(addCourse);
studentRouter.route("/courses/delete/:courseId").patch(removeCourse);

export default studentRouter;
