import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import CourseCategory from "../models/coursecategory.model.js";
import createError from "http-errors";

//{{URL}}/admin
const getAllUsers = async (req, res, next) => {
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
const getAllStudents = async (req, res, next) => {
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
const getAllTeachers = async (req, res, next) => {
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
const getAllCourses = async (req, res, next) => {
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

//{{URL}}/admin/managecategory
const getAllCourseCategories = async (req, res, next) => {
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
    categories: sortedCourseCategories,
    empty: sortedCourseCategories.length === 0
  });
  // } else {
  //   throw createError.Unauthorized();
  // }
};

//{{URL}}/admin/edituser?id
const getEditUserPage = async function (req, res, next) {
  const id = req.query.id || 0;
  const user = await User.findById({ _id: id }).lean();
  if (user === null) {
    return res.redirect('/admin');
  }

  res.render('vwAdminManagement/edit/edituser', {
    user
  });
}

//{{URL}}/admin/editcategory
const getEditCategoryPage = async function (req, res, next) {
  const id = req.query.id || 0;
  const category = await CourseCategory.findById({ _id: id }).lean();
  if (category === null) {
    return res.redirect('/admin/managecategory');
  }

  res.render('vwAdminManagement/edit/editcategory', {
    category
  });
}

//{{URL}}/admin/addcategory
const getAddCategoryPage = async function (req, res, next) {

  res.render('vwAdminManagement/add/addcategory');
}

//{{URL}}/admin/managecourses?id
const viewCoursesByID = async function (req, res, next) {
  const id = req.query.id || 0;
  const category = await CourseCategory.findById({ _id: id }).lean();
  const courses = await Course.find({ category: id }).lean();
  if (category === null) {
    return res.redirect('/admin/managecategory');
  }
  res.render('vwAdminManagement/coursesID', {
    category,
    courses,
    empty: courses.length === 0,
  })
}

//{{URL}}/admin/edituser/patch
const updateUserPermission = async function (req, res, next) {
  const { UserID, permission } = req.body;
  const userUpdate = await User.findByIdAndUpdate(
    {
      _id: UserID,

    },
    { permission },
    { new: true, runValidators: true }
  )
  if (!userUpdate) {
    return next(createError(400, "Please provide a user"));
  }
  res.redirect('/admin');
}

//{{URL}}/admin/edituser/del
const deleteUser = async function (req, res, next) {
  const { UserID } = req.body;
  const deleteUser = await User.findByIdAndRemove({ _id: UserID })
  if (!deleteUser) {
    return next(createError(400, "Please provide a user"));

  }
  res.redirect('/admin');
}

//{{URL}}//admin/addcategory/post
const createCourseCategory = async function (req, res, next) {
  // req.body.createdBy= req.user._id
  if (!req.body.CategoryName) {
    return next(createError(400, "Please provide category name"));
  }
  else {
    const createCategory = await CourseCategory.create({ name: req.body.CategoryName });
  }
  res.redirect('/admin/managecategory')
}

//{{URL}}/admin/editcategory/patch
const updateCourseCategory = async function (req, res, next) {
  const { CategoryID, CategoryNewName } = req.body;
  const userUpdate = await CourseCategory.findByIdAndUpdate(
    {
      _id: CategoryID,

    },
    { name: CategoryNewName },
    { new: true, runValidators: true }
  )
  if (!userUpdate) {
    return next(createError(400, "Please provide a user"));
  }
  res.redirect('/admin/managecategory');
}

//{{URL}}/admin/editcategory/del
const deleteCourseCategory = async function (req, res, next) {
  const { CategoryID } = req.body;
  const categoryCheck = await CourseCategory.findById({ _id: CategoryID })
  if (!categoryCheck) {
    return next(createError(404, "This category doesn't exist"));
  }
  if (categoryCheck.courseList.length > 0) {
    return next(createError(400, "Cant delete a category when having courses"));
  }
  const deleteCategory = await CourseCategory.findByIdAndRemove({ _id: CategoryID })
  res.redirect('/admin/managecategory');
}


// {{URL}}/admin/:id
// const getUser = async (req, res, next) => {
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
  getEditUserPage,
  getEditCategoryPage,
  getAddCategoryPage,
  viewCoursesByID,
  updateUserPermission,
  deleteUser,
  createCourseCategory,
  updateCourseCategory,
  deleteCourseCategory
};

//flow
/* 
Khi getUser thì sẽ phải tìm user có id đúng với params được cấp và lấy dữ liệu
Khi getAllUsers thì sẽ lấy ra tất cả các user tồn tại trong database
Khi deleteUser thì sẽ phải tìm user có id đúng với params được cấp và delete
Khi updateUser thì sẽ phải tìm user có id đúng với params được cấp và update

*/
