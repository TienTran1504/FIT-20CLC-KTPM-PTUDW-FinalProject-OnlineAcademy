import createError from "http-errors";
import multer from "multer";
import User from "../models/user.model";
import CourseCategory from "../models/coursecategory.model";
import CourseLanguage from "../models/courselanguage.model";
import Course from "../models/course.model";

const getInfo = async (req, res, next) => {
  req.session.authUser = await User.findOne({
    // _id: "63a6c10fe930ca09e8b4d4d0",
    _id:"63a88e96fa8ed14a442f5064"
  }).lean();

  res.render("vwTeacher/profile", {
    user: req.session.authUser,
  });
};

const updateInfo = async (req, res, next) => {
  try {
    req.session.authUser.firstName = req.body.firstName;
    req.session.authUser.lastName = req.body.lastName;
    req.session.authUser.headline = req.body.headline;
    req.session.authUser.description = req.body.description;

    await User.findByIdAndUpdate({_id: req.session.authUser._id}, req.session.authUser);
    
    res.redirect("/teacher/profile");
  } catch (err) {
    throw createError.InternalServerError(err.message);
  }
}

const getPhoto = (req, res) => {
  res.render("vwTeacher/photo", {
    user: req.session.authUser,
  });
};

const uploadPhoto = (req, res, next) => {console.log(req.session.authUser);
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

      await User.findByIdAndUpdate({_id: req.session.authUser._id}, req.session.authUser);

      res.redirect("/teacher/profile/photo");
    }
  });
};

const getAccountSecurity = (req, res) => {
  res.render("vwTeacher/account_security", {
    user: req.session.authUser
  });
};

//{{URL}}/teacher/my_course
const getOwnerCourses = async (req, res, next) => {
  const courses = await Course.find({ createdBy: req.session.authUser._id }).sort(
    "createdAt"
  ).lean();

  // if (search) {
  //   sortedCourses = sortedCourses.filter((course) => {
  //     return course.name.startsWith(search);
  //   });
  // }
  // if (limit) {
  //   sortedCourses = sortedCourses.slice(0, Number(limit));
  // }

  res.render("vwTeacher/my_course", {
    user: req.session.authUser,
    courses
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
      layout: "createCourseStep1",
    });
  }
  else {
    const cat = req.query.category;
    req.session.createCourse = {};
    req.session.createCourse.cat = cat;
    res.redirect("/teacher/course/2");
  }
};

const createCourse2 = async (req, res) => {
  if (!req.query.language) {
    const languages = await CourseLanguage.find({ categoryName: req.session.createCourse.cat})
      .sort("createdAt")
      .lean();

    const langList = [...languages];

    res.render("vwTeacher/vwCreateCourse/step2", {
      languages: langList,
      layout: "createCourseStep2",
    });
  } else {
    req.session.createCourse.lang = req.query.language;
    res.redirect("/teacher/course/3");
  }
  
};

const createCourse3 = async (req, res) => {
  res.render("vwTeacher/vwCreateCourse/step3", {
    layout: "createCourseStep3",
  });
};

//{{URL}}/courses
const createCourse = async (req, res, next) => {
  // const userCheck = await User.findOne({ _id: req.user.userId });
  // if (userCheck.permission === "teacher") {
  //   req.body.createdBy = req.user.userId;
  //   const course = await Course.create({ ...req.body });
  //   res.status(StatusCodes.CREATED).json({
  //     course,
  //   });
  // } else {
  //   throw createError.Unauthorized("User have no permission");
  // }
  try {
    const cat = await CourseCategory.findOne({ name: req.session.createCourse.cat }).lean();
    const lang = await CourseLanguage.findOne({ 
      name: req.session.createCourse.lang,
      categoryName: cat.name
    }).lean();
    
    // const courses = await Course.find({}).lean();
    // console.log(courses); 
    const createdCourse = await Course.create({
      createdBy: req.session.authUser._id,
      name: req.body.name,
      languageId: lang._id,
      languageName: lang.name,
      categoryId: cat._id,
      categoryName: cat.name
    });

    console.log(createdCourse);
    delete req.session.createCourse;

    res.redirect("/teacher/profile/my_course");
  } catch(err) {
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

// {{URL}}/courses/:id
const deleteCourse = async (req, res) => {
  const userCheck = await User.findOne({ _id: req.user.userId });
  if (userCheck.permission === "teacher") {
    const {
      user: { userId },
      params: { id: courseId },
    } = req;
    const courseCheck = await Course.findOne({ _id: courseId });
    if (courseCheck.createdBy == userId) {
      const course = await Course.findByIdAndRemove({
        _id: courseId,
        createdBy: userId,
      });
      if (!course) {
        throw new NotFoundError(`No course with id ${courseId}`);
      }
      res
        .status(StatusCodes.OK)
        .json({ msg: `Delete course ID: ${courseId} successfully ` });
    } else {
      throw createError.Unauthorized("Teacher doesnt own this course");
    }
  } else {
    throw createError.Unauthorized("User have no permission");
  }
};

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
