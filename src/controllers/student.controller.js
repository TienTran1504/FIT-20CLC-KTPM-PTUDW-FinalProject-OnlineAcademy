import { StatusCodes } from "http-status-codes";
import createError from "http-errors";
import Course from "../models/course.model";
import User from "../models/user.model";

// {{URL}}/student/courses
const getCourseList = async (req, res) => {
  // const user = await User.findOne({ _id: req.user.userId }); // lấy ra đúng user đang login
  // res
  //   .status(StatusCodes.OK)
  //   .json({ id: user._id, name: user.name, courseList: user.courseList });
  res.render("vwStudentProfile/profile", { style: "student_profile.css" });
};

// {{URL}}/student/courses/:courseId
const addCourse = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const { courseId } = req.params;
  const course = await Course.findOne({ _id: courseId });
  const checkCourseExist = user.courseList.some((course) => {
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
  const checkCourseExist = user.courseList.some((course) => {
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
  const checkCourseExist = user.courseList.some((course) => {
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
    const newCourseList = user.courseList.map((course) => {
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

export { getCourseList, updateStatusCourse, removeCourse, addCourse };
/*main flow:
Khi getCourseList sẽ lấy ra danh sách các khoá học mà học viên đã đăng ký
Khi updateStatusCourse sẽ tìm course đó có trong danh sách học viên đã đăng ký dựa trên id course và sẽ update trạng thái in progress hay completed khoá học
Khi addCourse thì sẽ kiểm tra course đó đã có trong danh sách học viên chưa, nếu chưa thì sẽ thêm vào danh sách khoá học của người dùng
Khi removeCourse thì sẽ kiểm tra course đó đã có trong danh sách học viên chưa, nếu có thì sẽ xoá khoá học khỏi danh sách khoá học của người dùng

*/
