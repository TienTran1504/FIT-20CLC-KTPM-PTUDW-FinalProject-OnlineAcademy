import express from "express";
const studentRouter = express.Router();

import {
  getProfile,
  getPhoto,
  getAccountSecurity,
  getCourseLearn,
  getFavoriteCourse,
  updateProfile,
  updatePassword,
  changeEmail,
} from "../controllers/student.controller";

studentRouter.route("/").get(getProfile);
studentRouter.route("/photo").get(getPhoto);
studentRouter
  .route("/account_security")
  .get(getAccountSecurity)
  .post(updatePassword);
studentRouter.route("/course_learn").get(getCourseLearn);
studentRouter.route("/favorite_course").get(getFavoriteCourse);
studentRouter.route("/update_profile/post").post(updateProfile);
studentRouter.route("/change_email/post").post(changeEmail);
// studentRouter.route("/updateprofile").post(updateProfile);
// studentRouter
//   .route("/courses/:courseId")
//   .patch(updateStatusCourse)
//   .post(addCourse);
// studentRouter.route("/courses/delete/:courseId").patch(removeCourse);

export default studentRouter;
