import createError from "http-errors";
import multer from "multer";
import User from "../models/user.model";
import CourseCategory from "../models/coursecategory.model";
import CourseLanguage from "../models/courselanguage.model";
import Course from "../models/course.model";
import Lecture from "../models/lecture.model";
import Feedback from "../models/feedback.model";
import bcrypt from "bcryptjs";
import { formatDate, fullStar, halfStar, blankStar } from "./home.controller";

const getInfo = async (req, res, next) => {
  res.render("vwTeacher/profile", {
    CatList: req.session.CatList,
    user: req.session.authUser,
  });
};

const updateInfo = async (req, res, next) => {
  try {
    req.session.authUser.firstName = req.body.firstName;
    req.session.authUser.lastName = req.body.lastName;
    req.session.authUser.headline = req.body.headline;
    req.session.authUser.description = req.body.description;

    await User.findByIdAndUpdate(
      { _id: req.session.authUser._id },
      req.session.authUser
    );

    res.redirect("/teacher/profile");
  } catch (err) {
    throw createError.InternalServerError(err.message);
  }
};

const getPhoto = (req, res) => {
  res.render("vwTeacher/photo", {
    CatList: req.session.CatList,
    user: req.session.authUser,
  });
};

const uploadPhoto = (req, res, next) => {
  let fileName;

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/assets/images");
    },
    filename: function (req, file, cb) {
      fileName = file.originalname;
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  upload.single("teacher-avatar")(req, res, async function (err) {
    if (err) {
      next(err);
    } else {
      req.session.authUser.image = fileName;

      await User.findByIdAndUpdate(
        { _id: req.session.authUser._id },
        req.session.authUser
      );

      res.redirect("/teacher/profile/photo");
    }
  });
};

const getAccountSecurity = (req, res) => {
  res.render("vwTeacher/account_security", {
    CatList: req.session.CatList,
    user: req.session.authUser,
  });
};

//{{URL}}/teacher/my_course
const getOwnerCourses = async (req, res, next) => {
  const limit = 4;
  const page = req.query.page || 1;
  const curPage = parseInt(page) || 1;
  const offset = (curPage - 1) * limit;

  const courses = await Course.find({ createdBy: req.session.authUser._id })
    .sort("createdAt")
    .lean();
  const feedback = await Feedback.find().lean();
  let coursesList = [...courses];
 
  coursesList = coursesList.map((course) => {
    var feedbackList = feedback.filter((u) => u.createdIn.toString() == course._id.toString());
    var CourseRatingVote = feedbackList.length;
    var CourseRatingPoint = +(feedbackList.reduce((a, b) => a + b.numberRated, 0) / CourseRatingVote).toFixed(1) || 0;
    
    return {
      ...course,
      CourseRatingVote: CourseRatingVote,
      CourseRatingPoint: CourseRatingPoint,
      fullStar: fullStar(CourseRatingPoint),
      halfStar: halfStar(CourseRatingPoint),
      blankStar: blankStar(CourseRatingPoint),
    };
  });

  const total = coursesList.length;
  const nPages = Math.ceil(total / limit);
  coursesList = coursesList.slice(offset, offset + limit);

  req.session.courses = courses;
  const pageNumbers = [];
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push({
      value: i,
      isCurrent: i === Number(+curPage),
    });
  }

  res.render("vwTeacher/my_course", {
    CatList: req.session.CatList,
    user: req.session.authUser,
    courses: coursesList,
    havePagination: courses.length > limit ? true : false,
    pageNumbers: pageNumbers,
    firstPage: Number(curPage) === 1 ? true : false,
    lastPage: Number(curPage) === nPages ? true : false,
    prevPage: "?page=" + Number(curPage - 1),
    nextPage: "?page=" + Number(curPage + 1),
  });
};

const createCourse1 = async (req, res) => {
  if (!req.query.category) {
    const courseCategories = await CourseCategory.find({})
      .sort("createdAt")
      .lean();
    const sortedCourseCategories = [...courseCategories];

    res.render("vwTeacher/vwCreateCourse/step1", {
      categories: sortedCourseCategories,
      layout: "create_course",
    });
  } else {
    const cat = req.query.category;
    req.session.createCourse = {};
    req.session.createCourse.cat = cat;
    res.redirect("/teacher/course/s2");
  }
};

const createCourse2 = async (req, res, next) => {
  try {
    if (!req.query.language) {
      // console.log(req.session.createCourse.cat);
      const languages = await CourseLanguage.find({
        categoryName: req.session.createCourse.cat,
      })
        .sort("createdAt")
        .lean();

      const langList = [...languages];
      res.render("vwTeacher/vwCreateCourse/step2", {
        languages: langList,
        layout: "create_course",
      });
    } else {
      req.session.createCourse.lang = req.query.language;
      res.redirect("/teacher/course/s3");
    }
  } catch (err) {
    console.log(err);
    next(createError.InternalServerError(err.message));
  }
};

const createCourse3 = async (req, res) => {
  res.render("vwTeacher/vwCreateCourse/step3", {
    layout: "create_course",
  });
};

//{{URL}}/courses
const createCourse = async (req, res, next) => {
  try {
    const cat = await CourseCategory.findOne({
      name: req.session.createCourse.cat,
    }).lean();
    const lang = await CourseLanguage.findOne({
      name: req.session.createCourse.lang,
      categoryName: cat.name,
    }).lean();

    // const courses = await Course.find({}).lean();
    // console.log(courses);
    // console.log(req.body);
    const createdCourse = await Course.create({
      createdBy: req.session.authUser._id,
      name: req.body.name,
      languageId: lang._id,
      languageName: lang.name,
      categoryId: cat._id,
      categoryName: cat.name,
    });

    lang.courseList.push(createdCourse);
    await CourseLanguage.findOneAndUpdate(
      { _id: lang._id },
      { courseList: lang.courseList }
    );

    delete req.session.createCourse;

    res.redirect("/teacher/profile/my_course");
  } catch (err) {
    console.log(err);
    next(createError.InternalServerError(err.message));
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const lang = await CourseLanguage.findById({ _id: req.session.currentCourse.languageId });
    const indexOf = lang.courseList.findIndex(course => {
      return course._id == req.params.id;
    })
    lang.courseList.splice(indexOf, 1);
    await CourseLanguage.findByIdAndUpdate({ _id: lang._id }, lang, { new: true, runValidators: true });
    await Feedback.deleteMany({ createdIn: req.params.id });
    await Lecture.deleteMany({ createdIn: req.params.id });
    await Course.findByIdAndDelete({ _id: req.params.id });

    delete req.session.currentCourse;
    res.redirect("/teacher/profile/my_course");
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
};

const checkCourse = (req, res, next) => {
  try {
    const id = req.params.id;

    const course = req.session.courses.filter(course => {
      return course._id.toString() === id;
    })[0];

    course._id = id;
    req.session.currentCourse = course;
    next();
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
};

//{{URL}}/courses/:id/info
const getCourseInfo = async (req, res, next) => {
  req.session.currentCourse = await Course.findOne({
    _id: req.session.currentCourse._id,
  }).lean();

  res.render("vwTeacher/vwUpdateCourse/info", {
    user: req.session.authUser,
    course: req.session.currentCourse,
    layout: "update_course",
  });
};

const updateCourseInfo = (req, res, next) => {
  try {
    let fileName;

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/assets/images");
      },
      filename: function (req, file, cb) {
        fileName = file.originalname;
        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage: storage });
    upload.single("image")(req, res, async function (err) {
      if (err) {
        next(createError.InternalServerError(err.message));
      } else {
        if (fileName !== undefined) {
          await Course.findOneAndUpdate(
            { _id: req.body._id },
            {
              name: req.body.name,
              briefDescription: req.body.briefDescription,
              detailDescription: req.body.detailDescription,
              price: parseInt(req.body.price),
              image: fileName,
            }
          ).lean();
        } else {
          await Course.findOneAndUpdate(
            { _id: req.body._id },
            {
              name: req.body.name,
              briefDescription: req.body.briefDescription,
              detailDescription: req.body.detailDescription,
              price: parseInt(req.body.price),
            }
          ).lean();
        }

        req.session.currentCourse = await Course.findById({
          _id: req.body._id,
        });

        res.redirect("info");
      }
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
};

const getCourseCurriculum = async (req, res, next) => {
  const lectures = await Lecture.find({
    createdIn: req.session.currentCourse._id,
  }).lean();
  req.session.currentCourse = await Course.findOne({
    _id: req.session.currentCourse._id,
  }).lean();

  res.render("vwTeacher/vwUpdateCourse/curriculum", {
    user: req.session.authUser,
    course: req.session.currentCourse,
    lectures,
    layout: "update_course",
  });
};

const getViewCreateLecture = (req, res, next) => {
  try {
    res.render("vwTeacher/vwUpdateCourse/create_lecture", {
      user: req.session.authUser,
      course: req.session.currentCourse,
      layout: "update_course",
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
};

const createLecture = async (req, res, next) => {
  try {
    let fileName;

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/assets/videos");
      },
      filename: function (req, file, cb) {
        fileName = file.originalname;
        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage: storage });
    upload.single("video")(req, res, async function (err) {
      if (err) {
        next(createError.InternalServerError(err.message));
      } else {
        const lecture = await Lecture.create({
          name: req.body.name,
          description: req.body.description || "",
          video: fileName || "",
          duration: req.body.duration,
          createdIn: req.session.currentCourse._id,
          createdBy: req.session.authUser._id,
        });
        const course = await Course.findById({ _id: req.session.currentCourse._id });
        course.lecture.push(lecture._id);
        await checkStatusOfCourse(req);

        res.redirect("curriculum");
      }
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
};

const getViewUpdateLecture = async (req, res, next) => {
  try {
    const lecture = await Lecture.findOne({ _id: req.params.lid }).lean();

    res.render("vwTeacher/vwUpdateCourse/update_lecture", {
      user: req.session.authUser,
      course: req.session.currentCourse,
      lecture,
      layout: "update_course",
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
};

const checkStatusOfCourse = async req => {
  const courseId = req.session.currentCourse._id;
  const lectures = await Lecture.find({ createdIn: courseId }).lean();

  let isFinish = true;

  if (lectures.length === 0) {
    isFinish = false;
  } else {
    lectures.forEach(lecture => {
      if (lecture.video === "" || lecture.description === "") {
        isFinish = false;
        return;
      }
    });
  }
  await Course.findByIdAndUpdate(
    { _id: courseId },
    { status: isFinish ? "completed" : "in progress" }
  ).lean();
};

const updateLecture = async (req, res, next) => {
  try {
    let fileName;

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/assets/videos");
      },
      filename: function (req, file, cb) {
        fileName = file.originalname;
        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage: storage });
    upload.single("video")(req, res, async function (err) {
      if (err) {
        next(createError.InternalServerError(err.message));
      } else {
        if (fileName) {
          await Lecture.findByIdAndUpdate(
            {
              _id: req.params.lid,
            },
            {
              name: req.body.name,
              description: req.body.description || "",
              video: fileName,
              duration: req.body.duration,
              createdIn: req.session.currentCourse._id,
              createdBy: req.session.authUser._id,
            }
          );
        } else {
          await Lecture.findByIdAndUpdate(
            {
              _id: req.params.lid,
            },
            {
              name: req.body.name,
              description: req.body.description || "",
              createdIn: req.session.currentCourse._id,
              createdBy: req.session.authUser._id,
            }
          );
        }


        await checkStatusOfCourse(req);
        res.redirect(`/teacher/course/${req.params.id}/curriculum`);
      }
    });
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
};

const deleteLecture = async (req, res, next) => {
  try {
    const lecture = await Lecture.findByIdAndDelete({ _id: req.params.lid });

    await checkStatusOfCourse(req);
    res.redirect(`/teacher/course/${req.params.id}/curriculum`);
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
};
// {{URL}}/courses/:id
const updateCourse = async (req, res) => {
  const userCheck = await User.findOne({ _id: req.user.userId });
  if (userCheck.permission === "teacher") {
    const {
      user: { userId },
      params: { id: courseId },
    } = req;
    const courseCheck = await Course.findOne({ _id: courseId });
    if (courseCheck.createdBy == userId) {
      const course = await Course.findByIdAndUpdate(
        {
          _id: courseId,
          createdBy: userId,
        },
        req.body,
        { new: true, runValidators: true }
      );
      if (!course) {
        throw createError.NotFound(`No course with id ${courseId}`);
      }
      res.status(StatusCodes.OK).json({ course });
    } else {
      throw createError.Unauthorized("Teacher doesnt own this course");
    }
  } else {
    throw createError.Unauthorized(`User have no permission`);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.session.authUser._id }).lean();

    const ret = bcrypt.compareSync(req.body.password, user.password);
    if (ret === false) {
      res.render("vwTeacher/update_acc", {
        CatList: req.session.CatList,
        user: req.session.authUser,
        err_message: "Password is wrong."
      });
    }
    else {
      req.session.authUser.email = req.body.email;

      await User.findByIdAndUpdate(
        { _id: req.session.authUser._id },
        req.session.authUser
      );

      res.redirect("/teacher/profile/account_security");
    }
  } catch (err) {
    console.log(err.message);
    next(createError.InternalServerError(err));
  }
}

const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.session.authUser._id }).lean();

    const ret = bcrypt.compareSync(req.body.password, user.password);
    if (ret === false) {
      res.render("vwTeacher/update_acc", {
        CatList: req.session.CatList,
        user: req.session.authUser,
        err_message: "Password is incorrect."
      });
    }
    else {
      const rawPassword = req.body.newpassword;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(rawPassword, salt);

      await User.findByIdAndUpdate(
        { _id: req.session.authUser._id },
        {
          password: hash
        }
      );

      res.redirect("/teacher/profile/account_security");
    }
  } catch (err) {
    console.log(err.message);
    next(createError.InternalServerError(err));
  }
}


export {
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
  getCourseCurriculum,
  getViewCreateLecture,
  createLecture,
  updateEmail,
  getViewUpdateLecture,
  updatePassword,
  updateLecture,
  deleteLecture,
  updateCourse,
  deleteCourse,
};

//flow
/*
 khi getOwnerCourses thì sẽ lấy ra tất cả khoá học mà teacher đó đã tạo.
 khi createCourse thì sẽ tạo ra khoá học mới
 Khi updateCourse thì sẽ kiểm tra khoá học đó có phải thuộc quyền sở hữu của giảng viên đó không, nếu có thì sẽ thực hiện update khoá học
 Khi deleteCourse thì sẽ kiểm tra khoá học đó có phải thuộc quyền sở hữu của giảng viên đó không, nếu có thì sẽ thực hiện delete khoá học
*/
