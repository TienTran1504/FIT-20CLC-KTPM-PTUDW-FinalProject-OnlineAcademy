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
    const instructor = await User.findOne({ _id: course.createdBy }).lean();

    res.render("vwCourseDetails/course_details", {
      course,
      instructor,
    });
  } catch (err) {
    console.error(err);
    next(createError.InternalServerError(err.message));
  }
};

// {{URL}}/courses
const addFeedback = async (req, res, next) => {
  const UserID = req.session.authUser._id;
  // const idcourse = "";
  const { idlecture } = req.params;
  const { star, content } = req.body;
  const lecture = await Lecture.findById({ _id: idlecture });
  const idcourse = lecture.createdIn;

  const createFeedback = await FeedBack.create({
    content: content,
    numberRated: star,
    createdIn: idcourse,
    createdBy: UserID,
  });

  const findCourse = await Course.findById({ _id: idcourse });

  const obj = { _id: createFeedback._id };
  findCourse.feedbackList.push(obj);
  await Course.findByIdAndUpdate(
    { _id: idcourse },
    {
      feedbackList: findCourse.feedbackList,
    },
    { new: true, runValidators: true }
  );
  res.redirect(`/courses/learn/${idlecture}`);
};

const viewLecture = async (req, res, next) => {
  const UserID = req.session.authUser._id;
  const getUser = await User.findById({ _id: UserID });
  const numberLectureStudied = getUser.lectureList.length;
  const { idlecture } = req.params;
  // const lecture = await Lecture.findById({ _id: idlecture });
  const lecture = {
    name: "",
    description: "",
    video: "",
    createdIn: "63b19ad71aa34d2d78b7232a",
    createdBy: "",
  };
  const courseId = lecture.createdIn;
  const thisCourse = await Course.findById({ _id: courseId });
  const lectureListId = thisCourse.lecture;
  const feedbacks = thisCourse.feedbackList;

  let lectureList = [];
  lectureListId.forEach(async value => {
    const getLecture = await Lecture.findById({ _id: value });
    lectureList = [...lectureList, getLecture];
  });

  let averageRating = 0;
  let feedbackList = [];
  let star = {
    s1: 0,
    s2: 0,
    s3: 0,
    s4: 0,
    s5: 0,
  };
  feedbacks.forEach(async value => {
    console.log("Có feedback");
    const feedback = await FeedBack.findById({ _id: value });
    const userFeedback = await User.findById({ _id: feedback.createdBy });
    const obj = {
      feedback: feedback,
      user: userFeedback,
    };
    feedbackList = [...feedbackList, obj];
    if (feedback.numberRated) {
      averageRating += feedback.numberRated;
      if (feedback.numberRated == 1) star.s1 += 1;
      else if (feedback.numberRated == 2) star.s2 += 1;
      else if (feedback.numberRated == 3) star.s3 += 1;
      else if (feedback.numberRated == 4) star.s4 += 1;
      else if (feedback.numberRated == 5) star.s5 += 1;
    }
  });
  if (feedbacks.length > 0) {
    averageRating /= feedbacks.length;
    star.s1 = (star.s1 * 100) / feedbacks.length;
    star.s2 = (star.s2 * 100) / feedbacks.length;
    star.s3 = (star.s3 * 100) / feedbacks.length;
    star.s4 = (star.s4 * 100) / feedbacks.length;
    star.s5 = (star.s5 * 100) / feedbacks.length;
  }
  console.log("Star: ", star);
  res.render("vwLectureContent/content", {
    course: thisCourse,
    lecture: lecture,
    rate: averageRating,
    feedbackList: feedbackList,
    lectureStudied: numberLectureStudied,
    lectureList: lectureList,
    star: star,
  });
};

export { getAllCourses, getCourse, viewLecture, addFeedback };

/* 
main flow:
Khi getAllCourses để lấy toàn bộ courses trong website.
Khi getCourse để lấy ra một course dựa trên id của nó.
*/
