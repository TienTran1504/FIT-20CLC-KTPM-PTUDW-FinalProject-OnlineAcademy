import { StatusCodes } from "http-status-codes";
import createError from "http-errors";
import Course from "../models/course.model";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import multer from "multer";
import alert from "alert";
import Feedback from "../models/feedback.model";
import Lecture from "../models/lecture.model";

const checkGender = gender => {
  if (gender === "Male") return true;
  return false;
};

const getProfile = async (req, res, next) => {
  if (req.session.authUser === null)
    return next(createError(401, "Unauthorized"));

  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  res.render("vwStudentProfile/profile", {
    CatList: req.session.CatList,
    user: getUser,
    name: getUser.firstName + " " + getUser.lastName,
    gender: checkGender(getUser.gender),
  });
};

const updateProfile = async (req, res, next) => {
  if (req.session.authUser === null)
    return next(createError(401, "Unauthorized"));

  const { firstname, lastname, gender, password_profile } = req.body;
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  if (!firstname || !lastname || !gender || !password_profile) {
    alert("Input information is empty");
    res.redirect("/student");
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(
    password_profile,
    getUser.password
  );
  if (!isPasswordCorrect) {
    alert("Incorrect password");
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
  if (req.session.authUser === null)
    return next(createError(401, "Unauthorized"));

  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  res.render("vwStudentProfile/photo", {
    CatList: req.session.CatList,
    user: getUser,
    gender: checkGender(getUser.gender),
    name: getUser.firstName + " " + getUser.lastName,
  });
};

const uploadPhoto = async (req, res) => {
  if (req.session.authUser === null)
    return next(createError(401, "Unauthorized"));

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
  if (req.session.authUser === null)
    return next(createError(401, "Unauthorized"));

  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  res.render("vwStudentProfile/account_security", {
    CatList: req.session.CatList,
    user: getUser,
    name: getUser.firstName + " " + getUser.lastName,
    gender: checkGender(getUser.gender),
  });
};

const updatePassword = async (req, res, next) => {
  if (req.session.authUser === null)
    return next(createError(401, "Unauthorized"));

  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();
  const { currentPassword, newPassword, rePassword } = req.body;

  if (!newPassword || !currentPassword) {
    alert("Input information is empty");
  } else {
    //compare password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      getUser.password
    );

    if (!isPasswordCorrect) {
      alert("Incorrect password");
    } else if (newPassword.length < 6) {
      alert("New password must be at least 6 characters");
    } else if (newPassword !== rePassword) {
      alert("Re-enter incorrect password");
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
      alert("Change password successfully");
    }
  }
  res.redirect("/student/account_security");
};

const changeEmail = async (req, res) => {
  if (req.session.authUser === null)
    return next(createError(401, "Unauthorized"));

  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();

  const { email, password_email } = req.body;

  console.log(email, password_email);

  if (!email || !password_email) {
    alert("Please enter email and password");
  }
  // else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
  //   alert("Email invalid");
  // }
  else {
    //compare password
    const isPasswordCorrect = await bcrypt.compare(
      password_email,
      getUser.password
    );
    if (!isPasswordCorrect) {
      alert("Incorrect password");
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
      alert("Change email successfully");
      res.render("vwStudentProfile/profile", {
        CatList: req.session.CatList,
        notif: "Successfully updated",
        user: userCheck,
        name: userCheck.firstName + " " + userCheck.lastName,
        gender: checkGender(getUser.gender),
      });
      return;
    }
  }
  res.redirect("/student");
};

const addWatchList = async (req, res, next) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id });
  const courseId = req.session.courseId;
  const course = await Course.findOne({ _id: courseId });
  const checkCourseExists = getUser.watchList.some(watch => {
    return watch.id === courseId;
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
    getUser.watchList.push({ id: courseId });

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
  res.redirect(`/courses/${courseId}`);
};

// {{URL}}/student/courses
const getCourseFavorite = async (req, res) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();
  const getCoursesId = getUser.watchList;
  const limit = 3;
  const page = req.query.page || 1;
  const curPage = parseInt(page) || 1;
  const offset = (curPage - 1) * limit;

  let listCourses = [];
  for (let i = 0; i < getCoursesId.length; i++) {
    const course = await Course.findById({ _id: getCoursesId[i].id });
    const feedbacks = course.feedbackList;
    let averageRate = 0;
    for (let j = 0; j < feedbacks.length; j++) {
      averageRate += feedbacks[j].numberRated;
    }
    if (averageRate > 0)
      averageRate = (averageRate / feedbacks.length).toFixed(1);
    else averageRate = 0;

    const obj = {
      name: course.name,
      image: course.image,
      des: course.briefDescription,
      category: course.categoryName,
      idCourse: course._id,
      rate: averageRate,
      numberRate: feedbacks.length,
      numberLecture: course.lecture.length,
      price: course.price,
    };
    listCourses = [...listCourses, obj];
  }
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
    CatList: req.session.CatList,
    user: getUser,
    name: getUser.firstName + " " + getUser.lastName,
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
  const courseId = req.session.courseId;
  let watchList = getUser.watchList;

  const index = watchList.findIndex(watchId => watchId.id === courseId);
  if (index !== -1) {
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
  }
  res.redirect(`/courses/${courseId}`);
};

const addCourseList = async (req, res, next) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id }).lean();
  const courseId = req.session.courseId;

  const course = await Course.findById({ _id: courseId });
  const checkCourseExists = getUser.courseList.some(watch => {
    return watch.id == courseId;
  });

  let today = new Date();
  const obj = {
    id: id,
    time:
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate(),
  };
  course.studentList.push(obj);

  await Course.findByIdAndUpdate(
    { _id: course._id },
    {
      studentList: course.studentList,
    },
    { new: true, runValidators: true }
  );

  if (!course) {
    return next(createError(400, `Not found this course with id ${courseId}`));
  } else if (checkCourseExists) {
    return next(
      createError(
        406,
        `Already have a course with id ${courseId} in the student course's list`
      )
    );
  } else {
    const addCourse = {
      id: courseId,
      process: 0,
    };
    getUser.courseList.push(addCourse);

    const userUpdate = await User.findByIdAndUpdate(
      {
        _id: getUser._id,
      },
      {
        courseList: getUser.courseList,
      },
      { new: true, runValidators: true }
    );
    res.redirect(`/courses/${courseId}`);
  }
};

// {{URL}}/student/courses
const getCourseList = async (req, res, next) => {
  try {
    const id = req.session.authUser._id;
    const getUser = await User.findById({ _id: id }).lean();
    const getCoursesId = getUser.courseList;
    const limit = 3;
    const page = req.query.page || 1;
    const curPage = parseInt(page) || 1;
    const offset = (curPage - 1) * limit;

    let listCourses = [];

    for (let i = 0; i < getCoursesId.length; i++) {
      const course = await Course.findById({ _id: getCoursesId[i].id });

      const feedback = await Feedback.findOne({
        createdBy: id,
        createdIn: getCoursesId[i],
      }).lean;

      const rateNumber = feedback.numberRated || 0;
      const lectureList = await Lecture.find({
        createdIn: getCoursesId[i].id,
      }).lean();

      const obj = {
        name: course.name,
        image: course.image,
        des: course.briefDescription,
        category: course.categoryName,
        idCourse: course._id,
        idLecture: lectureList[0]._id,
        process: getCoursesId[i].process,
        rate: rateNumber,
      };
      listCourses = [...listCourses, obj];
    }

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
      CatList: req.session.CatList,
      user: getUser,
      name: getUser.firstName + " " + getUser.lastName,
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
  } catch (err) {
    next(createError.InternalServerError(err.message));
  }
};

const updateCourseLearn = async (req, res) => {
  const id = req.session.authUser._id;
  const getUser = await User.findById({ _id: id });
  const list = getUser.courseList;
  const { currentId, checkboxId } = req.params;
  const lecture = await Lecture.findById({ _id: checkboxId });
  const getAllLecture = await Lecture.find({ createdIn: lecture.createdIn });
  const listLectures = getUser.lectureList;

  let checked = false;
  let i = 0;
  for (; i < listLectures.length; i++) {
    if (String(listLectures[i]._id) === String(lecture._id)) {
      checked = true;
      break;
    }
  }

  if (checked) getUser.lectureList.splice(i, 1);
  else getUser.lectureList.push(lecture);

  let count = 0;
  for (let i = 0; i < listLectures.length; i++) {
    if (listLectures[i].createdIn === lecture.createdIn) {
      count++;
    }
  }

  for (let i = 0; i < list.length; i++) {
    if (String(list[i].id) === String(lecture.createdIn)) {
      list[i].process = Math.round((count * 100) / getAllLecture.length);
      break;
    }
  }

  const userUpdate = await User.findByIdAndUpdate(
    {
      _id: getUser._id,
    },
    {
      lectureList: getUser.lectureList,
      courseList: list,
    },
    { new: true, runValidators: true }
  );

  res.redirect(`/courses/learn/${currentId}`);
};

const removeFavouriteCourseFromProfile = async (req, res) => {
  const { courseId } = req.params;
  const getUser = await User.findById({ _id: req.session.authUser._id }).lean();
  let watchList = getUser.watchList;

  const index = watchList.findIndex(watchId => watchId.id === courseId);
  if (index !== -1) {
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
  }
  res.redirect("/student/favorite_course");
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
  addCourseList,
  addWatchList,
  removeCourseInWatchList,
  updateCourseLearn,
  removeFavouriteCourseFromProfile,
};
/*main flow:
Khi getCourseList sẽ lấy ra danh sách các khoá học mà học viên đã đăng ký
Khi updateStatusCourse sẽ tìm course đó có trong danh sách học viên đã đăng ký dựa trên id course và sẽ update trạng thái in progress hay completed khoá học
Khi addCourse thì sẽ kiểm tra course đó đã có trong danh sách học viên chưa, nếu chưa thì sẽ thêm vào danh sách khoá học của người dùng
Khi removeCourse thì sẽ kiểm tra course đó đã có trong danh sách học viên chưa, nếu có thì sẽ xoá khoá học khỏi danh sách khoá học của người dùng

*/
