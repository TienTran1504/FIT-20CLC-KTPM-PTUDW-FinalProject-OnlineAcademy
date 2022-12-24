import express from "express";
const teacherRouter = express.Router();

import {
  getInfo,
  getPhoto,
  uploadPhoto,
  getAccountSecurity,
  getOwnerCourses,
  createCourse1,
  createCourse2,
  createCourse3,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/teacher.controller";

teacherRouter.route("/profile/photo").get(getPhoto).post(uploadPhoto);
teacherRouter.route("/profile/account_security").get(getAccountSecurity);
teacherRouter.route("/profile/my_course").get(getOwnerCourses);
teacherRouter.route("/profile").get(getInfo);
teacherRouter.route("/course/1").get(createCourse1);
teacherRouter.route("/course/2").get(createCourse2);
teacherRouter.route("/course/3").get(createCourse3);
teacherRouter.route("/course/:id").patch(updateCourse).delete(deleteCourse);
teacherRouter.route("/course").post(createCourse);

export default teacherRouter;
