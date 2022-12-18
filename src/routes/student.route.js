import express from "express";
const studentRouter = express.Router();

import {
  getProfile,
  getPhoto,
  getAccountSecurity,
  getCourseLearn,
  getFavoriteCourse,
} from "../controllers/student.controller";

studentRouter.route("/").get(getProfile);
studentRouter.route("/photo").get(getPhoto);
studentRouter.route("/accountSecurity").get(getAccountSecurity);
studentRouter.route("/courseLearn").get(getCourseLearn);
studentRouter.route("/favoriteCourse").get(getFavoriteCourse);
// studentRouter
//   .route("/courses/:courseId")
//   .patch(updateStatusCourse)
//   .post(addCourse);
// studentRouter.route("/courses/delete/:courseId").patch(removeCourse);

export default studentRouter;
