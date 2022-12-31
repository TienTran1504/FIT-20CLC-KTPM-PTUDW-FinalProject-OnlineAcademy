import express from "express";
const teacherRouter = express.Router();

import {
  getInfo,
  updateInfo,
  getPhoto,
  uploadPhoto,
  getAccountSecurity,
  getOwnerCourses,
  createCourse1,
  createCourse2,
  createCourse3,
  createCourse,
  checkCourse,
  getCourseInfo,
  updateCourseInfo,
  getCoursePricing,
  updateCoursePricing,
  updateCourse,
  deleteCourse,
} from "../controllers/teacher.controller";

teacherRouter.route("/profile/photo").get(getPhoto).post(uploadPhoto);
teacherRouter.route("/profile/account_security").get(getAccountSecurity);
teacherRouter.route("/profile/my_course").get(getOwnerCourses);
teacherRouter.route("/profile").get(getInfo).post(updateInfo);
teacherRouter.route("/course/s1").get(createCourse1);
teacherRouter.route("/course/s2").get(createCourse2);
teacherRouter.route("/course/s3").get(createCourse3).post(createCourse);
teacherRouter.route("/course/:id/info").get(checkCourse, getCourseInfo).post(updateCourseInfo);
teacherRouter.route("/course/:id/pricing").get(checkCourse, getCoursePricing).post(updateCoursePricing);
teacherRouter.route("/course");
export default teacherRouter;
