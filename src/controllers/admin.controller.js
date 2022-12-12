import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import CourseCategory from "../models/coursecategory.model.js";
import createError from "http-errors";

//{{URL}}/admin
const getAllUsers = async (req, res) => {
  // const userCheck = await User.findOne({ _id: req.user.userId }); // lấy ra đúng user đang login
  // if (userCheck.permission === "admin") {
  const { search, limit } = req.query;
  const users = await User.find({}).sort('createdAt').lean();
  let sortedUsers = [...users];
  if (search) {
    sortedUsers = sortedUsers.filter((user) => {
      return user.name.startsWith(search);
    });
  }
  if (limit) {
    sortedUsers = sortedUsers.slice(0, Number(limit));
  }
  // res.status(StatusCodes.OK).json({ sortedUsers, count: sortedUsers.length });
  res.render('vwAdminManagement/index', {
    users: sortedUsers,
    empty: sortedUsers.length === 0
  });
  // } else {
  //   throw createError.Unauthorized();
  // }
};
//{{URL}}/admin/managestudents
const getAllStudents = async (req, res) => {
  // const userCheck = await User.findOne({ _id: req.user.userId }); // lấy ra đúng user đang login
  // if (userCheck.permission === "admin") {
  const { search, limit } = req.query;
  const users = await User.find({ permission: "student" }).sort('createdAt').lean();
  let sortedUsers = [...users];
  if (search) {
    sortedUsers = sortedUsers.filter((user) => {
      return user.name.startsWith(search);
    });
  }
  if (limit) {
    sortedUsers = sortedUsers.slice(0, Number(limit));
  }
  // res.status(StatusCodes.OK).json({ sortedUsers, count: sortedUsers.length });
  res.render('vwAdminManagement/students', {
    users: sortedUsers,
    empty: sortedUsers.length === 0
  });
  // } else {
  //   throw createError.Unauthorized();
  // }
};
//{{URL}}/admin/manageteachers
const getAllTeachers = async (req, res) => {
  // const userCheck = await User.findOne({ _id: req.user.userId }); // lấy ra đúng user đang login
  // if (userCheck.permission === "admin") {
  const { search, limit } = req.query;
  const users = await User.find({ permission: "teacher" }).sort('createdAt').lean();
  let sortedUsers = [...users];
  if (search) {
    sortedUsers = sortedUsers.filter((user) => {
      return user.name.startsWith(search);
    });
  }
  if (limit) {
    sortedUsers = sortedUsers.slice(0, Number(limit));
  }
  // res.status(StatusCodes.OK).json({ sortedUsers, count: sortedUsers.length });
  res.render('vwAdminManagement/teachers', {
    users: sortedUsers,
    empty: sortedUsers.length === 0
  });
  // } else {
  //   throw createError.Unauthorized();
  // }
};
//{{URL}}/admin/managecourses
const getAllCourses = async (req, res) => {
  // const userCheck = await User.findOne({ _id: req.user.userId }); // lấy ra đúng user đang login
  // if (userCheck.permission === "admin") {
  const { search, limit } = req.query;
  const courses = await Course.find({}).sort('createdAt').lean();
  let sortedCourses = [...courses];
  if (search) {
    sortedCourses = sortedCourses.filter((course) => {
      return course.name.startsWith(search);
    });
  }
  if (limit) {
    sortedCourses = sortedCourses.slice(0, Number(limit));
  }
  // res.status(StatusCodes.OK).json({ sortedCourses, count: sortedCourses.length });
  res.render('vwAdminManagement/courses', {
    courses: sortedCourses,
    empty: sortedCourses.length === 0
  });
  // } else {
  //   throw createError.Unauthorized();
  // }
};

//{{URL}}/admin/managecoursecategory
const getAllCourseCategories = async (req, res) => {
  // const userCheck = await User.findOne({ _id: req.user.userId }); // lấy ra đúng user đang login
  // if (userCheck.permission === "admin") {
  const { search, limit } = req.query;
  const courseCategories = await CourseCategory.find({}).sort('createdAt').lean();
  let sortedCourseCategories = [...courseCategories];
  if (search) {
    sortedCourseCategories = sortedCourseCategories.filter((course) => {
      return course.name.startsWith(search);
    });
  }
  if (limit) {
    sortedCourseCategories = sortedCourseCategories.slice(0, Number(limit));
  }
  // res.status(StatusCodes.OK).json({ sortedCourseCategories, count: sortedCourseCategories.length });
  res.render('vwAdminManagement/coursecategory', {
    courses: sortedCourseCategories,
    empty: sortedCourseCategories.length === 0
  });
  // } else {
  //   throw createError.Unauthorized();
  // }
};
const getEditPage = async function (req, res) {
  const id = req.query.id || 0;
  const user = await User.findById({ _id: id }).lean();
  if (user === null) {
    return res.redirect('/admin');
  }

  res.render('vwAdminManagement/edit/edituser', {
    user
  });
}

const updateUserPermission = async function (req, res) {
  const { UserID, permission } = req.body;
  const userUpdate = await User.findByIdAndUpdate(
    {
      _id: UserID,

    },
    { permission },
    { new: true, runValidators: true }
  )
  if (!userUpdate) {
    throw createError.NotFound();
  }
  res.redirect('/admin');
}

const deleteUser = async function (req, res) {
  const { UserID } = req.body;
  const deleteUser = await User.findByIdAndRemove({ _id: UserID })
  if (!deleteUser) {
    throw createError.NotFound();
  }
  res.redirect('/admin');
}

// {{URL}}/admin/:id
// const getUser = async (req, res) => {
//   const userCheck = await User.findOne({ _id: req.user.userId });
//   if (userCheck.permission === "admin") {
//     const {
//       params: { id: userId },
//     } = req; // req.user.userId, req.params.id

//     const user = await User.findOne({
//       _id: userId,
//     });
//     if (!user) {
//       throw new NotFoundError(`No user with id ${userId}`);
//     }
//     res.status(StatusCodes.OK).json({ user });
//   } else {
//     throw createError.Unauthorized();
//   }
// };
// // {{URL}}/admin/:id
// const deleteUser = async (req, res) => {
//   const userCheck = await User.findOne({ _id: req.user.userId });
//   if (userCheck.permission === "admin") {
//     const {
//       params: { id: userId },
//     } = req;

//     const user = await User.findByIdAndRemove({
//       _id: userId,
//     });

//     if (!user) {
//       throw createError.NotFound();
//     }
//     res
//       .status(StatusCodes.OK)
//       .json({ msg: `Delete user ID: ${userId} successfully ` });
//   } else {
//     throw createError.Unauthorized();
//   }
// };
// // {{URL}}/admin/:id
// const updateUser = async (req, res) => {
//   const userCheck = await User.findOne({ _id: req.user.userId });
//   if (userCheck.permission === "admin") {
//     const {
//       body: { permission },
//       params: { id: userId },
//     } = req;

//     if (permission === "") {
//       throw createError.BadRequest();
//     }
//     const user = await User.findByIdAndUpdate(
//       {
//         _id: userId,
//         permission: permission,
//       },
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!user) {
//       throw createError.NotFound();
//     }
//     res.status(StatusCodes.OK).json({ user });
//   } else {
//     throw createError.Unauthorized();
//   }
// };

export {
  getAllUsers,
  getAllStudents,
  getAllTeachers,
  getAllCourses,
  getAllCourseCategories,
  getEditPage,
  updateUserPermission,
  deleteUser,
};

//flow
/* 
Khi getUser thì sẽ phải tìm user có id đúng với params được cấp và lấy dữ liệu
Khi getAllUsers thì sẽ lấy ra tất cả các user tồn tại trong database
Khi deleteUser thì sẽ phải tìm user có id đúng với params được cấp và delete
Khi updateUser thì sẽ phải tìm user có id đúng với params được cấp và update

*/
