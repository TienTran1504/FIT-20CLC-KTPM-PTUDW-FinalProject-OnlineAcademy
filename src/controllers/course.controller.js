import { StatusCodes } from "http-status-codes";
import createError from "http-errors";
import Course from "../models/course.model";
import User from "../models/user.model";
import Lecture from "../models/lecture.model";
import FeedBack from "../models/feedback.model";

// {{URL}}/courses
const getAllCourses = async (req, res) => {
  const { search, limit } = req.query;
  const courses = await Course.find({}).sort("createdAt");
  let sortedCourses = [...courses];
  if (search) {
    sortedCourses = sortedCourses.filter(course => {
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

const feedbackCourse = async (req, res, next) => {
  const { UserID, star, content, CourseID } = req.body;

  const createFeedback = await FeedBack.create({
    content: content,
    numberRated: star,
    createdIn: CourseID,
    createdBy: UserID,
  });
  const findCourse = Course.findById({ _id: CourseID });
  findCourse.feedbackList.push({ _id: createFeedback._id });
  await Course.findByIdAndUpdate(
    { _id: CourseID },
    {
      feedbackList: findCourse.feedbackList,
    },
    { new: true, runValidators: true }
  );
};

const viewLecture = async (req, res, next) => {
  // const { idcourse, idlecture } = req.params;
  // const lecture = await Lecture.findById({ _id: idlecture }).lean();
  // const feedbacks = await FeedBack.find({ createdIn: idcourse }).lean();

  // if (!lecture) {
  //   return next(createError(500, "Dont have this lecture"));
  // }
  // if (!feedbacks) {
  //   return next(createError(500, "Dont have this feedback"));
  // }
  res.render("vwLectureContent/content", {
    // lecture,
    // feedbacks,
  });
};

export { getAllCourses, getCourse, viewLecture };

/* 
main flow:
Khi getAllCourses để lấy toàn bộ courses trong website.
Khi getCourse để lấy ra một course dựa trên id của nó.
*/
