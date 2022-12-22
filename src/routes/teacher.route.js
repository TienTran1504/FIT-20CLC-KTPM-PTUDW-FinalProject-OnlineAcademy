import express from "express";
const teacherRouter = express.Router();

import {
  getInfo,
  getPhoto,
  getAccountSecurity,
  getOwnerCourses,
  newCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/teacher.controller";

teacherRouter.route("/profile/photo").get(getPhoto);
teacherRouter.route("/profile/account_security").get(getAccountSecurity);
teacherRouter.route("/profile/my_course").get(getOwnerCourses);
teacherRouter.route("/profile").get(getInfo);
teacherRouter.route("/course/:id").patch(updateCourse).delete(deleteCourse);
teacherRouter.route("/course").get(newCourse).post(createCourse);

export default teacherRouter;
