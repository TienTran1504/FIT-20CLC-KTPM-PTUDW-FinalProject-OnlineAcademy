import { StatusCodes } from "http-status-codes";
import createError from "http-errors";
import Course from "../models/course.model";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import multer from "multer";

const checkGender = gender => {
  if (gender === "Male") return true;
  return false;
};

const getProfile = async (req, res) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  res.render("vwStudentProfile/profile", {
    user: getUser,
    name: getUser.firstName + " " + getUser.lastName,
    gender: checkGender(getUser.gender),
  });
};

const updateProfile = async (req, res, next) => {
  const { firstname, lastname, gender, password_profile } = req.body;
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  if (!firstname || !lastname || !gender || !password_profile) {
    return next(createError(400, "Invalid input information"));
  }

  const isPasswordCorrect = await bcrypt.compare(
    password_profile,
    getUser.password
  );
  if (!isPasswordCorrect) {
    return next(createError(400, "Incorrect password"));
  } else {
    const updateUser = await User.findByIdAndUpdate(
      { _id: getUser._id },
      { firstName: firstname, lastName: lastname, gender: gender },
      { new: true, runValidators: true }
    );
  }
  res.redirect("/student");
};

const getPhoto = async (req, res) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  res.render("vwStudentProfile/photo", {
    user: getUser,
    gender: checkGender(getUser.gender),
  });
};

const uploadPhoto = async (req, res) => {
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
  upload.single("student-avatar")(req, res, async function (err) {
    if (err) {
      next(err);
    } else {
      req.session.authUser.image = fileName;

      await User.findByIdAndUpdate(
        { _id: req.session.authUser._id },
        req.session.authUser
      );

      res.redirect("/student/photo");
    }
  });
};

const getAccountSecurity = async (req, res) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  res.render("vwStudentProfile/account_security", {
    user: getUser,
    gender: checkGender(getUser.gender),
  });
};

const updatePassword = async (req, res, next) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();
  const { currentPassword, newPassword, rePassword } = req.body;
  res.jsonp({ success: true });

  if (!newPassword || !currentPassword) {
    res.render("vwStudentProfile/account_security", {
      notif: true,
    });
    // alert("Input validation failed");
    return;
  } else {
    //compare password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      getUser.password
    );

    if (!isPasswordCorrect) {
      res.render("vwStudentProfile/account_security", {
        notif: "Wrong current password ",
      });
    } else if (newPassword !== rePassword) {
      res.render("vwStudentProfile/account_security", {
        notif: "Re-type password incorrect",
      });
    } else {
      //Hashing password
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(newPassword, salt);
      const updatePassword = {
        password: passwordHashed,
      };
      const getUserUpdate = await User.findByIdAndUpdate(
        {
          _id: getUser._id,
        },
        updatePassword,
        { new: true, runValidators: true }
      );
      res.redirect("/student/account_security");
    }
  }
};

const changeEmail = async (req, res) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  const { email, password } = req.body;

  if (!email || !password) {
    res.render("vwStudentProfile/profile", {
      notif: "Input validation failed",
      user: getUser,
      name: getUser.firstName + " " + getUser.lastName,
    });
  } else {
    //compare password
    const isPasswordCorrect = await bcrypt.compare(password, getUser.password);
    if (!isPasswordCorrect) {
      res.render("vwStudentProfile/profile", {
        notif: "Wrong current password ",
        user: getUser,
        name: getUser.firstName + " " + getUser.lastName,
      });
    } else {
      const changeEmail = {
        email: email,
      };
      const userUpdate = await User.findByIdAndUpdate(
        {
          _id: getUser._id,
        },
        changeEmail,
        { new: true, runValidators: true }
      );

      const userCheck = await User.findById({ _id: id }).lean();

      res.render("vwStudentProfile/profile", {
        notif: "Successfully updated",
        user: userCheck,
        name: userCheck.firstName + " " + userCheck.lastName,
        gender: checkGender(getUser.gender),
      });
    }
  }
};

const addWatchList = async (req, res, next) => {
  const getUser = await User.findById({ _id: req.user.userId });
  const { courseId } = req.params;
  const course = await Course.findOne({ _id: courseId });
  const checkCourseExists = getUser.watchList.some(watch => {
    return watch._id === courseId;
  });

  if (course === null) {
    return next(createError(400, "Not found this course with id " + courseId));
  } else if (checkCourseExists) {
    return next(
      createError(
        406,
        `Already have a course with id ${courseId} in the student favorite course's list`
      )
    );
  } else {
    getUser.watchList.push(courseId);

    const userUpdate = await User.findByIdAndUpdate(
      {
        _id: getUser._id,
      },
      {
        watchList: getUser.watchList,
      },
      { new: true, runValidators: true }
    );
  }
};

// {{URL}}/student/courses
const getCourseFavorite = async (req, res) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  const getCoursesId = getUser.watchList;
  const limit = 6;
  const page = req.query.page || 1;
  const curPage = parseInt(page) || 1;
  const offset = (curPage - 1) * limit;

  let listCourses = [];
  getCoursesId.forEach(async idCourse => {
    var course = await Course.findById(idCourse);
    if (course !== null) {
      listCourses = [...listCourses, course];
    }
  });
  const total = listCourses.length;
  const nPages = Math.ceil(total / limit);
  listCourses = listCourses.slice(offset, offset + limit);

  const pageNumbers = [];
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push({
      value: i,
      isCurrent: i === Number(+curPage),
    });
  }

  res.render("vwStudentProfile/favorite_courses", {
    user: getUser,
    gender: checkGender(getUser.gender),
    length: getCoursesId.length,
    courses: listCourses,
    empty: listCourses.length === 0,
    havePagination: getCoursesId.length > limit ? true : false,
    pageNumbers: pageNumbers,
    firstPage: Number(curPage) === 1 ? true : false,
    lastPage: Number(curPage) === nPages ? true : false,
    prevPage: "?page=" + Number(curPage - 1),
    nextPage: "?page=" + Number(curPage + 1),
  });
};

const removeCourseInWatchList = async (req, res, next) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  let watchList = getUser.watchList;
  const idCourse = req.body.id;
  const index = watchList.findIndex(watchId => watchId === idCourse);
  watchList.splice(index, 1);
  const userUpdate = await User.findByIdAndUpdate(
    {
      _id: getUser._id,
    },
    {
      watchList,
    },
    { new: true, runValidators: true }
  );
  res.redirect("/student/favorite_course");
};

const addCourseList = async (req, res, next) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  const { courseId } = req.params;
  const course = await Course.findOne({ _id: courseId });
  const checkCourseExists = getUser.courseList.some(watch => {
    return watch._id === courseId;
  });

  if (course === null) {
    return next(createError(400, "Not found this course with id " + courseId));
  } else if (checkCourseExists) {
    return next(
      createError(
        406,
        `Already have a course with id ${courseId} in the student course's list`
      )
    );
  } else {
    getUser.courseList.push(courseId);

    const userUpdate = await User.findByIdAndUpdate(
      {
        _id: getUser._id,
      },
      {
        courseList: getUser.courseList,
      },
      { new: true, runValidators: true }
    );
  }
};

// {{URL}}/student/courses
const getCourseList = async (req, res) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  const getCoursesId = getUser.courseList;
  const limit = 6;
  const page = req.query.page || 1;
  const curPage = parseInt(page) || 1;
  const offset = (curPage - 1) * limit;

  let listCourses = [];
  getCoursesId.forEach(async idCourse => {
    var course = await Course.findById(idCourse);
    if (course !== null) {
      listCourses = [...listCourses, course];
    }
  });
  const total = listCourses.length;
  const nPages = Math.ceil(total / limit);
  listCourses = listCourses.slice(offset, offset + limit);

  const pageNumbers = [];
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push({
      value: i,
      isCurrent: i === Number(+curPage),
    });
  }

  res.render("vwStudentProfile/courses_learn", {
    user: getUser,
    gender: checkGender(getUser.gender),
    length: getCoursesId.length,
    courses: listCourses,
    empty: listCourses.length === 0,
    havePagination: getCoursesId.length > limit ? true : false,
    pageNumbers: pageNumbers,
    firstPage: Number(curPage) === 1 ? true : false,
    lastPage: Number(curPage) === nPages ? true : false,
    prevPage: "?page=" + Number(curPage - 1),
    nextPage: "?page=" + Number(curPage + 1),
  });
};
// {{URL}}/student/courses/:courseId
const addCourse = async (req, res) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  const { courseId } = req.params;
  const course = await Course.findOne({ _id: courseId });
  const checkCourseExist = user.courseList.some(course => {
    return course.course._id == courseId;
  });

  if (course === null) {
    throw createError.NotFound();
  } else if (checkCourseExist) {
    throw createError.BadRequest(
      `Already have course with id ${courseId} in student course's list`
    );
  } else {
    const item = { course };
    user.courseList.push(item);
    req.body.courseList = user.courseList;
    const userUpdate = await User.findByIdAndUpdate(
      {
        _id: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({
      msg: `Add ${course.name} successfully`,
      name: userUpdate.name,
      courseList: userUpdate.courseList,
      courseLength: userUpdate.courseList.length,
    });
  }
};

export {
  getProfile,
  getPhoto,
  getAccountSecurity,
  getCourseList,
  getCourseFavorite,
  updateProfile,
  updatePassword,
  changeEmail,
  uploadPhoto,
};
/*main flow:
Khi getCourseList sẽ lấy ra danh sách các khoá học mà học viên đã đăng ký
Khi updateStatusCourse sẽ tìm course đó có trong danh sách học viên đã đăng ký dựa trên id course và sẽ update trạng thái in progress hay completed khoá học
Khi addCourse thì sẽ kiểm tra course đó đã có trong danh sách học viên chưa, nếu chưa thì sẽ thêm vào danh sách khoá học của người dùng
Khi removeCourse thì sẽ kiểm tra course đó đã có trong danh sách học viên chưa, nếu có thì sẽ xoá khoá học khỏi danh sách khoá học của người dùng

*/
