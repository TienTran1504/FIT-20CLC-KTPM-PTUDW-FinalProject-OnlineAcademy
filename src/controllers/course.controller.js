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

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("-");
}


// {{URL}}/courses/:id
const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id }).lean();
    const instructor = await User.findOne({ _id: course.createdBy}).lean();

    CourseList = CourseList.map((course) => {
      var feedbackList = feedback.filter((u) => u.createdIn.toString() == course._id.toString());
      var CourseRatingVote = feedbackList.length;
      var CourseRatingPoint = +(feedbackList.reduce((a, b) => a + b.numberRated, 0) / CourseRatingVote).toFixed(1) || 0;
      var user = users.find((u) => u._id == course.createdBy.toString());
  
      return {
        ...course,
        CourseRatingVote: CourseRatingVote,
        CourseRatingPoint: CourseRatingPoint,
        createdBy: user.firstName + " " + user.lastName,
        viewInWeek: course.viewList.filter((view) => dateDiffInDays(view.createdAt, new Date()) <= 7).length,
      };
    });

    res.render("vwCourseDetails/course_details", {
      course,
      instructor
    });
  }  catch (err) {
    console.error(err);
    next(createError.InternalServerError(err.message));
  }
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
