import { StatusCodes } from "http-status-codes";
import createError from "http-errors";
import Course from "../models/course.model";
import User from "../models/user.model";

// {{URL}}/courses
const getAllCourses = async (req, res) => {
  const { search, limit } = req.query;
  const courses = await Course.find({}).sort("createdAt");
  let sortedCourses = [...courses];
  if (search) {
    sortedCourses = sortedCourses.filter((course) => {
      return course.name.startsWith(search);
    });
  }
  if (limit) {
    sortedCourses = sortedCourses.slice(0, Number(limit));
  }
  if (sortedCourses.length < 1) {
    return res
      .status(StatusCodes.OK)
      .json({ msg: "No courses match your search" });
  }
  res
    .status(StatusCodes.OK)
    .json({ sortedCourses, count: sortedCourses.length });
};
// {{URL}}/courses/:id
const getCourse = async (req, res) => {
  res.render("vwCourseDetails/course_details");

  // const {
  //   params: { id: courseId },
  // } = req; // req.user.userId, req.params.id
  // const course = await Course.findOne({
  //   _id: courseId,
  // });
  // if (!course) {
  //   throw createError.NotFound();
  // }
  // res.status(StatusCodes.OK).json({ course });
};
// {{URL}}/courses

export { getAllCourses, getCourse };

/* 
main flow:
Khi getAllCourses để lấy toàn bộ courses trong website.
Khi getCourse để lấy ra một course dựa trên id của nó.
*/
