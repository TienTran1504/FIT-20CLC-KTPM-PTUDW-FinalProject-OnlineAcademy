import { StatusCodes } from "http-status-codes";
import createError from "http-errors";
import Course from "../models/course.model";
import User from "../models/user.model";
import Lecture from "../models/lecture.model";
import FeedBack from "../models/feedback.model";
import { formatDate, fullStar, halfStar, blankStar } from "./home.controller";

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
const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById({ _id: req.params.id }).lean();
    const instructor = await User.findOne({ _id: course.createdBy }).lean();

    course.updatedAt = formatDate(course.updatedAt);
    course.numberOfStudents = course.studentList.length;
    course.numberOfFeedbacks = course.feedbackList.length;
    course.ratingPoint =
      +(
        course.feedbackList.reduce((a, b) => a + b.numberRated, 0) /
        course.numberOfFeedbacks
      ).toFixed(1) || 0;
    course.fullStar = fullStar(course.ratingPoint);
    course.halfStar = halfStar(course.ratingPoint);
    course.blankStar = blankStar(course.ratingPoint);

    const listOfCourses = await Course.find({
      createdBy: instructor._id,
    }).lean();
    instructor.numberOfStudents = listOfCourses.reduce(
      (a, b) => a + b.studentList.length,
      0
    );

    res.render("vwCourseDetails/course_details", {
      course,
      instructor,
    });
  } catch (err) {
    console.log(err.message);
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
  const lecture = await Lecture.findById({ _id: idlecture }).lean();
  const courseId = lecture.createdIn;
  const thisCourse = await Course.findById({ _id: courseId }).lean();
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
    const feedback = await FeedBack.findById({ _id: value }).lean();
    const userFeedback = await User.findById({
      _id: feedback.createdBy,
    }).lean();
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
  const a = {
    course: thisCourse,
    lecture: lecture,
    rate: averageRating,
    feedbackList: feedbackList,
    lectureStudied: numberLectureStudied,
    lectureList: lectureList,
    star: star,
  };
  console.log("Star: ", a);
  res.render("vwLectureContent/content", {
    course: thisCourse,
    lecture: lecture,
    rate: averageRating,
    // feedbackList: feedbackList,
    lectureStudied: numberLectureStudied,
    // lectureList: lectureList,
    star: star,
  });
};

export { getAllCourses, getCourse, viewLecture, addFeedback };

/* 
main flow:
Khi getAllCourses để lấy toàn bộ courses trong website.
Khi getCourse để lấy ra một course dựa trên id của nó.
*/
