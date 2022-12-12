import express from "express";
const adminRouter = express.Router();

import {
  getAllCourses,
  getAllStudents,
  getAllTeachers,
  getAllTypeCourses,
  // deleteUser, getAllUsers, getUser, updateUser
  getAllUsers,
} from "../controllers/admin.controller";

adminRouter.route("/").get(getAllUsers);
adminRouter.route("/managestudents").get(getAllStudents);
adminRouter.route("/manageteachers").get(getAllTeachers);
adminRouter.route("/managetypecourses").get(getAllTypeCourses);
adminRouter.route("/managecourses").get(getAllCourses);
// adminRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)

export default adminRouter;
