import { StatusCodes } from "http-status-codes";
import createError from "http-errors";
import Course from "../models/course.model";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

const id = "63aaaf7dbe355f57283b0600";

const getProfile = async (req, res) => {
  const user = await User.findById({ _id: id }).lean();

  res.render("vwStudentProfile/profile", {
    user,
    name: user.firstName + " " + user.lastName,
  });
};

const updateProfile = async (req, res) => {
  const { firstname, lastname, gender } = req.body;
  const updateUser = await User.findByIdAndUpdate(
    { _id: id },
    { firstName: firstname, lastName: lastname, gender: gender },
    { new: true, runValidators: true }
  );
  res.redirect("/student");
  console.log(updateUser);
};

const getPhoto = async (req, res) => {
  res.render("vwStudentProfile/photo");
};

const getAccountSecurity = async (req, res) => {
  res.render("vwStudentProfile/account_security");
};

const getCourseLearn = async (req, res) => {
  res.render("vwStudentProfile/courses_learn");
};

const getFavoriteCourse = async (req, res) => {
  res.render("vwStudentProfile/favorite_courses");
};

const updatePassword = async (req, res, next) => {
  const id = "63aaaf7dbe355f57283b0600";
  // const user = await User.findOne({ _id: req.user.userId });

  const user = await User.findById({ _id: id }).lean();
  const { currentPassword, newPassword, rePassword } = req.body;

  console.log(currentPassword, newPassword, rePassword);
  if (!newPassword || !currentPassword) {
    res.render("vwStudentProfile/account_security", {
      notif: "Input validation failed",
    });
  } else {
    //compare password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
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
      const userUpdate = await User.findByIdAndUpdate(
        {
          _id: user._id,
        },
        updatePassword,
        { new: true, runValidators: true }
      );
      res.redirect("/student/account_security");
    }
  }
};

const changeEmail = async (req, res) => {
  const id = "63aaaf7dbe355f57283b0600";
  // const user = await User.findOne({ _id: req.user.userId });
  const user = await User.findById({ _id: id }).lean();

  const { email, password } = req.body;
  if (!email || !password) {
    res.render("vwStudentProfile/profile", {
      notif: "Input validation failed",
      user,
      name: user.firstName + " " + user.lastName,
    });
  } else {
    //compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.render("vwStudentProfile/profile", {
        notif: "Wrong current password ",
        user,
        name: user.firstName + " " + user.lastName,
      });
    } else {
      const changeEmail = {
        email: email,
      };
      console.log(changeEmail);
      const userUpdate = await User.findByIdAndUpdate(
        {
          _id: user._id,
        },
        changeEmail,
        { new: true, runValidators: true }
      );

      const userCheck = await User.findById({ _id: id }).lean();

      res.render("vwStudentProfile/profile", {
        notif: "Successfully updated",
        user: userCheck,
        name: userCheck.firstName + " " + userCheck.lastName,
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
    return next(createError(404, "Not found this course with id " + courseId));
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

const addCourseList = async (req, res, next) => {
  const getUser = await User.findById({ _id: req.user.userId });
  const { courseId } = req.params;
  const course = await Course.findOne({ _id: courseId });
  const checkCourseExists = getUser.courseList.some(watch => {
    return watch._id === courseId;
  });

  if (course === null) {
    return next(createError(404, "Not found this course with id " + courseId));
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
  // const user = await User.findOne({ _id: req.user.userId }); // lấy ra đúng user đang login

  const id = "63aaaf7dbe355f57283b0600";
  const user = await User.findById({ _id: id }).lean(); // lấy ra đúng user đang login
};

// {{URL}}/student/courses/:courseId
const addCourse = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
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

// {{URL}}/student/courses/:courseId
const removeCourse = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const { courseId } = req.params;
  const course = await Course.findOne({ _id: courseId });
  const checkCourseExist = user.courseList.some(course => {
    return course.course._id == courseId;
  });
  if (!checkCourseExist) {
    throw createError.BadRequest(
      `Dont exist course with id ${courseId} in student course's list`
    );
  }
  const indexDelete = user.courseList.map((course, index) => {
    if (course.course._id == courseId) {
      return index;
    }
  });
  for (let i = 0; i < indexDelete.length; i++) {
    if (indexDelete[i] || indexDelete[i] === 0) {
      let index = indexDelete[i];
      user.courseList.splice(index, 1);
    }
  }

  req.body.courseList = user.courseList;
  const userUpdate = await User.findByIdAndUpdate(
    {
      _id: user._id,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({
    msg: `Delete course: ${course.name} from student course's list successfully`,
    _id: userUpdate._id,
    name: userUpdate.name,
    courseList: userUpdate.courseList,
    courseLength: userUpdate.courseList.length,
  });
};

// {{URL}}/student/courses/:courseId
const updateStatusCourse = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const { status } = req.body;
  const { courseId } = req.params;
  const course = await Course.findOne({ _id: courseId });
  const checkCourseExist = user.courseList.some(course => {
    return course.course._id == courseId;
  });
  if (!status) {
    throw createError.BadRequest("Status field can not be empty");
  } else if (status !== "in progress" && status !== "completed") {
    throw createError.BadRequest("Status field is completed or in progres");
  } else if (!checkCourseExist) {
    throw createError.BadRequest(
      `Dont exist course with id ${courseId} in student course's list`
    );
  } else {
    const newCourseList = user.courseList.map(course => {
      if (course.course._id == courseId) {
        course.course.status = status;
      }
      return course;
    });
    req.body.courseList = newCourseList;
    const userUpdate = await User.findByIdAndUpdate(
      {
        _id: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({
      msg: `Update quantity ${courseId} successfully`,
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
  getCourseLearn,
  getFavoriteCourse,
  updateProfile,
  updatePassword,
  changeEmail,
};
/*main flow:
Khi getCourseList sẽ lấy ra danh sách các khoá học mà học viên đã đăng ký
Khi updateStatusCourse sẽ tìm course đó có trong danh sách học viên đã đăng ký dựa trên id course và sẽ update trạng thái in progress hay completed khoá học
Khi addCourse thì sẽ kiểm tra course đó đã có trong danh sách học viên chưa, nếu chưa thì sẽ thêm vào danh sách khoá học của người dùng
Khi removeCourse thì sẽ kiểm tra course đó đã có trong danh sách học viên chưa, nếu có thì sẽ xoá khoá học khỏi danh sách khoá học của người dùng

*/
