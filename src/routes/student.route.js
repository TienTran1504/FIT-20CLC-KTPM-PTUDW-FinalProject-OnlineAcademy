import express from "express";
const studentRouter = express.Router();

import {
  getProfile,
  getPhoto,
  getAccountSecurity,
  getCourseList,
  getCourseFavorite,
  updateProfile,
  updatePassword,
  changeEmail,
  uploadPhoto,
  addCourseList,
  addWatchList,
  removeCourseInWatchList,
  updateCourseLearn,
  removeFavouriteCourseFromProfile,
} from "../controllers/student.controller";

studentRouter.route("/").get(getProfile);
studentRouter.route("/photo").get(getPhoto).post(uploadPhoto);
studentRouter
  .route("/account_security")
  .get(getAccountSecurity)
  .post(updatePassword);
studentRouter.route("/course_learn").get(getCourseList);
studentRouter.route("/favorite_course").get(getCourseFavorite);
studentRouter.route("/update_profile/post").post(updateProfile);
studentRouter.route("/change_email/post").post(changeEmail);
studentRouter.route("/add_courses/post").post(addCourseList);
studentRouter.route("/add_courses_favorite/post").post(addWatchList);
studentRouter
  .route("/remove_courses_favorite/post")
  .post(removeCourseInWatchList);
studentRouter
  .route("/update_process/post/:currentId/:checkboxId")
  .post(updateCourseLearn);
studentRouter
  .route("/remove_courses_favorite_profile/post/:courseId")
  .post(removeFavouriteCourseFromProfile);
export default studentRouter;
