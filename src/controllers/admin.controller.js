import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import CourseCategory from "../models/coursecategory.model.js";
import CourseLanguage from "../models/courselanguage.model";
import Feedback from "../models/feedback.model";
import createError from "http-errors";

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return next(createError(400, "Please provide complete information "));
  } else {
    const user = await User.create({ ...req.body });
    res.status(200).json({
      user,
    });
  }
};

//{{URL}}/admin
const getAllUsers = async (req, res, next) => {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const limit = 7;
      const page = req.query.page || 1;
      const curPage = parseInt(page) || 1;
      const offset = (curPage - 1) * limit;

      const users = await User.find({}).sort("createdAt").lean();
      let sortedUsers = [...users];
      const indexOf = sortedUsers.findIndex(user => {
        return user.permission === "Admin";
      })
      sortedUsers.splice(indexOf, 1);
      const total = sortedUsers.length;
      const nPages = Math.ceil(total / limit);
      sortedUsers = sortedUsers.slice(offset, offset + limit);

      const pageNumbers = [];
      for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
          value: i,
          isCurrent: i === Number(+curPage),
        });
      }
      res.render("vwAdminManagement/index", {
        CatList: req.session.CatList,
        length: users.length - 1,
        users: sortedUsers,
        empty: sortedUsers.length === 0,
        havePagination: (users.length - 1) > limit ? true : false,
        pageNumbers: pageNumbers,
        firstPage: Number(curPage) === 1 ? true : false,
        lastPage: Number(curPage) === nPages ? true : false,
        prevPage: "?page=" + Number(curPage - 1),
        nextPage: "?page=" + Number(curPage + 1),
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};
//{{URL}}/admin/managestudents
const getAllStudents = async (req, res, next) => {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const limit = 7;
      const page = req.query.page || 1;
      const curPage = parseInt(page) || 1;
      const offset = (curPage - 1) * limit;
      const users = await User.find({ permission: "Student" })
        .sort("createdAt")
        .lean();
      let sortedUsers = [...users];

      const total = sortedUsers.length;
      const nPages = Math.ceil(total / limit);
      sortedUsers = sortedUsers.slice(offset, offset + limit);

      const pageNumbers = [];
      for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
          value: i,
          isCurrent: i === Number(+curPage),
        });
      }
      res.render("vwAdminManagement/students", {
        CatList: req.session.CatList,
        length: users.length,
        users: sortedUsers,
        empty: sortedUsers.length === 0,
        havePagination: users.length > limit ? true : false,
        pageNumbers: pageNumbers,
        firstPage: Number(curPage) === 1 ? true : false,
        lastPage: Number(curPage) === nPages ? true : false,
        prevPage: "?page=" + Number(curPage - 1),
        nextPage: "?page=" + Number(curPage + 1),
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};
//{{URL}}/admin/manageteachers
const getAllTeachers = async (req, res, next) => {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const limit = 7;
      const page = req.query.page || 1;
      const curPage = parseInt(page) || 1;
      const offset = (curPage - 1) * limit;
      const users = await User.find({ permission: "Teacher" })
        .sort("createdAt")
        .lean();
      let sortedUsers = [...users];
      const total = sortedUsers.length;
      const nPages = Math.ceil(total / limit);
      sortedUsers = sortedUsers.slice(offset, offset + limit);

      const pageNumbers = [];
      for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
          value: i,
          isCurrent: i === Number(+curPage),
        });
      }
      res.render("vwAdminManagement/teachers", {
        CatList: req.session.CatList,
        length: users.length,
        users: sortedUsers,
        empty: sortedUsers.length === 0,
        havePagination: users.length > limit ? true : false,
        pageNumbers: pageNumbers,
        firstPage: Number(curPage) === 1 ? true : false,
        lastPage: Number(curPage) === nPages ? true : false,
        prevPage: "?page=" + Number(curPage - 1),
        nextPage: "?page=" + Number(curPage + 1),
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};
//{{URL}}/admin/managecourses
const getAllCourses = async (req, res, next) => {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const limit = 7;
      const page = req.query.page || 1;
      const curPage = parseInt(page) || 1;
      const offset = (curPage - 1) * limit;
      const courses = await Course.find({}).sort("createdAt").lean();
      let sortedCourses = [...courses];

      const total = sortedCourses.length;
      const nPages = Math.ceil(total / limit);
      sortedCourses = sortedCourses.slice(offset, offset + limit);

      const pageNumbers = [];
      for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
          value: i,
          isCurrent: i === Number(+curPage),
        });
      }

      res.render("vwAdminManagement/courses", {
        CatList: req.session.CatList,
        length: courses.length,
        courses: sortedCourses,
        empty: sortedCourses.length === 0,
        havePagination: courses.length > limit ? true : false,
        pageNumbers: pageNumbers,
        firstPage: Number(curPage) === 1 ? true : false,
        lastPage: Number(curPage) === nPages ? true : false,
        prevPage: "?page=" + Number(curPage - 1),
        nextPage: "?page=" + Number(curPage + 1),
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/managecategory
const getAllCourseCategories = async (req, res, next) => {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const limit = 7;
      const page = req.query.page || 1;
      const curPage = parseInt(page) || 1;
      const offset = (curPage - 1) * limit;
      const courseCategories = await CourseCategory.find({})
        .sort("createdAt")
        .lean();
      let sortedCourseCategories = [...courseCategories];

      const total = sortedCourseCategories.length;
      const nPages = Math.ceil(total / limit);
      sortedCourseCategories = sortedCourseCategories.slice(offset, offset + limit);

      const pageNumbers = [];
      for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
          value: i,
          isCurrent: i === Number(+curPage),
        });
      }
      res.render("vwAdminManagement/coursecategory", {
        CatList: req.session.CatList,
        length: courseCategories.length,
        categories: sortedCourseCategories,
        empty: sortedCourseCategories.length === 0,
        havePagination: courseCategories.length > limit ? true : false,
        pageNumbers: pageNumbers,
        firstPage: Number(curPage) === 1 ? true : false,
        lastPage: Number(curPage) === nPages ? true : false,
        prevPage: "?page=" + Number(curPage - 1),
        nextPage: "?page=" + Number(curPage + 1),
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/managelanguage
const getAllCourseLanguages = async (req, res, next) => {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const limit = 5;
      const page = req.query.page || 1;
      const curPage = parseInt(page) || 1;
      const offset = (curPage - 1) * limit;
      const courseLanguages = await CourseLanguage.find({})
        .sort("createdAt")
        .lean();
      let sortedCourseLanguages = [...courseLanguages];
      const total = sortedCourseLanguages.length;
      const nPages = Math.ceil(total / limit);
      sortedCourseLanguages = sortedCourseLanguages.slice(offset, offset + limit);

      const pageNumbers = [];
      for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
          value: i,
          isCurrent: i === Number(+curPage),
        });
      }
      res.render("vwAdminManagement/courselanguage", {
        CatList: req.session.CatList,
        length: courseLanguages.length,
        languages: sortedCourseLanguages,
        empty: sortedCourseLanguages.length === 0,
        havePagination: courseLanguages.length > limit ? true : false,
        pageNumbers: pageNumbers,
        firstPage: Number(curPage) === 1 ? true : false,
        lastPage: Number(curPage) === nPages ? true : false,
        prevPage: "?page=" + Number(curPage - 1),
        nextPage: "?page=" + Number(curPage + 1),
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/edituser?id
const getEditUserPage = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const id = req.query.id || 0;
      const user = await User.findById({ _id: id }).lean();
      if (user === null) {
        return res.redirect("/admin");
      }

      res.render("vwAdminManagement/edit/edituser", {
        CatList: req.session.CatList,
        user,
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/editcourse?id
const getEditCoursePage = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const id = req.query.id || 0;
      const course = await Course.findById({ _id: id }).lean();
      if (course === null) {
        return res.redirect("/admin");
      }

      res.render("vwAdminManagement/edit/editcourse", {
        CatList: req.session.CatList,
        course,
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/editcategory
const getEditCategoryPage = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const id = req.query.id || 0;
      const category = await CourseCategory.findById({ _id: id }).lean();
      if (category === null) {
        return res.redirect("/admin/managecategory");
      }

      res.render("vwAdminManagement/edit/editcategory", {
        CatList: req.session.CatList,
        category,
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/editcategory
const getEditLanguagePage = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const id = req.query.id || 0;
      const language = await CourseLanguage.findById({ _id: id }).lean();
      const courseCategories = await CourseCategory.find({})
        .sort("createdAt")
        .lean();
      let sortedCourseCategories = [...courseCategories];
      if (language === null) {
        return res.redirect("/admin/managelanguage");
      }
      res.render("vwAdminManagement/edit/editlanguage", {
        CatList: req.session.CatList,
        language,
        categories: sortedCourseCategories,
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/addcategory
const getAddCategoryPage = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      res.render("vwAdminManagement/add/addcategory", {
        CatList: req.session.CatList,
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/addlanguage
const getAddLanguagePage = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const courseCategories = await CourseCategory.find({})
        .sort("createdAt")
        .lean();
      let sortedCourseCategories = [...courseCategories];

      res.render("vwAdminManagement/add/addlanguage", {
        CatList: req.session.CatList,
        categories: sortedCourseCategories,
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/addcategory
const getAddTeacherPage = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      res.render("vwAdminManagement/add/addteacher", {
        CatList: req.session.CatList,
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/managecategoryid?id
const viewLanguagesByID = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const id = req.query.id || 0;
      const category = await CourseCategory.findById({ _id: id }).lean();
      const languages = await CourseLanguage.find({ categoryId: id }).lean();
      if (category === null) {
        return res.redirect("/admin/managecategory");
      }
      res.render("vwAdminManagement/languagesID", {
        CatList: req.session.CatList,
        category,
        languages,
        empty: languages.length === 0,
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

// {{ URL }}/admin/managelanguageid?id
const viewCoursesByID = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const id = req.query.id || 0;
      const language = await CourseLanguage.findById({ _id: id }).lean();
      const courses = await Course.find({ languageId: id }).lean();
      if (language === null) {
        return res.redirect("/admin/managelanguage");
      }
      res.render("vwAdminManagement/coursesID", {
        CatList: req.session.CatList,
        language,
        courses,
        empty: courses.length === 0,
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};
// {{ URL }}/admin/manageteachers?id
const viewCoursesByTeacherID = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const id = req.query.id || 0;
      const user = await User.findById({ _id: id }).lean();
      const courses = await Course.find({ createdBy: id }).lean();
      if (user === null) {
        return res.redirect("/admin/manageteachers");
      }
      res.render("vwAdminManagement/teachercourses", {
        CatList: req.session.CatList,
        user,
        courses,
        empty: courses.length === 0,
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

// {{ URL }}/admin/managefeedbacksid?id
const viewFeedBacksByID = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const id = req.query.id || 0;
      const course = await Course.findOne({ _id: id }).lean();
      const feedbacks = await Feedback.find({ createdIn: id }).lean();
      let listFeedBacks = [];
      for (let i = 0; i < feedbacks.length; i++) {

        const user = await User.findById({ _id: feedbacks[i].createdBy });
        const objFeedBack = {
          content: feedbacks[i].content,
          rating: feedbacks[i].numberRated || 0,
          email: user.email,
        };
        listFeedBacks.push(objFeedBack);
      }
      let rated = 0;
      if (listFeedBacks.length !== 0) {
        const totalFeedBacks = listFeedBacks.reduce((total, feedback) => {
          return total + Number(feedback.rating);
        }, 0);
        rated = Number(totalFeedBacks / listFeedBacks.length).toFixed(1);
      }
      res.render("vwAdminManagement/feedbacks", {
        CatList: req.session.CatList,
        rated,
        course,
        listFeedBacks,
        empty: listFeedBacks.length === 0,
      });
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

// {{ URL }}/admin/manageratingid?id
// const viewRatingByID = async function (req, res, next) {
//   // const userCheck = await User.findOne({ _id: req.user.userId }); // lấy ra đúng user đang login
//   // if (userCheck.permission === "Admin") {
//   const id = req.query.id || 0;
//   const course = await Course.findOne({ _id: id }).lean();
//   const ratings = await Rating.find({ createdIn: id }).lean();
//   let listRating = [];
//   for (let i = 0; ratings.length; i++) {
//     const user = await User.findById({ _id: ratings[i].createdBy });

//     const objRating = { numberRated: ratings[i].numberRated, email: user.email };
//     listRating.push(objRating);
//   }
//   res.render("vwAdminManagement/rating", {
//     course,
//     listRating,
//     empty: listRating.length === 0,
//   });
//   // } else {
//   //    return next(createError(500, "User has no permission "));
//   // }
// };

//{{URL}}/admin/edituser/patch
const updateUserPermission = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const { UserID, permission, blocked } = req.body;
      const userUpdate = await User.findByIdAndUpdate(
        {
          _id: UserID,
        },
        {
          permission,
          blocked
        },
        { new: true, runValidators: true }
      );
      if (!userUpdate) {
        return next(createError(400, "Please provide a user"));
      }
      res.redirect("/admin");
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/editcourse/patch
const updateCourseDisable = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const { CourseID, disable } = req.body;
      const courseUpdate = await Course.findByIdAndUpdate(
        {
          _id: CourseID,
        },
        {
          disable
        },
        { new: true, runValidators: true }
      );
      if (!courseUpdate) {
        return next(createError(400, "Please provide a user"));
      }
      res.redirect("/admin/managecourses");
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/edituser/del
const deleteUser = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const { UserID } = req.body;
      const userCheck = await User.findById({ _id: UserID });
      if (userCheck.permission === "Teacher") {
        const deleteCourses = await Course.deleteMany({ createdBy: UserID });
      }
      const deleteUser = await User.findByIdAndRemove({ _id: UserID });
      if (!deleteUser) {
        return next(createError(400, "Please provide a user"));
      }
      res.redirect("/admin");
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};
//{{URL}}/admin/editcourse/del
const deleteCourse = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const { CourseID } = req.body;
      const courseCheck = await Course.findById({ _id: CourseID });
      const language = await CourseLanguage.findById({ _id: courseCheck.languageId });
      const indexOf = language.courseList.findIndex(course => {
        return course._id === CourseID
      })
      language.courseList.splice(indexOf, 1);

      await CourseLanguage.findByIdAndUpdate(
        { _id: language._id },
        {
          courseList: language.courseList
        },
        {
          new: true, runValidators: true
        }
      );
      const deleteCourse = await Course.deleteOne({ _id: CourseID });
      if (!deleteCourse) {
        return next(createError(400, "Please provide a course"));
      }
      res.redirect("/admin/managecourses");
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/addteacher/post
const createCourseCategory = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      // req.body.createdBy= req.user._id
      if (!req.body.CategoryName || !req.body.CategoryImage) {
        return next(createError(400, "Please provide category name, image"));
      } else {
        const checkExistCategory = await CourseCategory.findOne({
          name: req.body.CategoryName,
        });
        if (checkExistCategory) {
          return next(
            createError(400, `Already have ${req.body.CategoryName} in database`)
          );
        } else {
          await CourseCategory.create({
            name: req.body.CategoryName,
            image: req.body.CategoryImage,
            createdBy: req.session.authUser._id,
          });
        }
      }
      res.redirect("/admin/managecategory");
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/addteacher/post
const createLanguage = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      let newLanguage = {};
      // req.body.createdBy= req.user._id
      if (
        !req.body.CategoryName ||
        !req.body.LanguageName ||
        !req.body.LanguageImage
      ) {
        return next(
          createError(400, "Please provide category name, language name & image")
        );
      } else {
        const category = await CourseCategory.findOne({
          name: req.body.CategoryName,
        });
        const checkLanguageExist = category.languageList.some(language => {
          return language.name === req.body.LanguageName;
        });
        if (checkLanguageExist) {
          return next(
            createError(500, `Already have this language in ${category.name}`)
          );
        }
        const createLanguage = await CourseLanguage.create({
          name: req.body.LanguageName,
          image: req.body.LanguageImage,
          categoryId: category._id,
          categoryName: category.name,
          createdBy: req.session.authUser._id,
        });
        newLanguage = { _id: createLanguage._id, name: createLanguage.name };
        category.languageList.push(newLanguage);
        const updateCategory = await CourseCategory.findOneAndUpdate(
          {
            name: req.body.CategoryName,
          },
          {
            languageList: category.languageList,
          },
          { new: true, runValidators: true }
        );
      }
      res.redirect("/admin/managelanguage");
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}//admin/addcategory/post
const createTeacherAccount = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      // req.body.createdBy= req.user._id
      if (
        !req.body.TeacherFirstName ||
        !req.body.TeacherLastName ||
        !req.body.TeacherEmail ||
        !req.body.TeacherPassword ||
        !req.body.Gender
      ) {
        return next(
          createError(
            500,
            "Please provide teacher's necessary information (first name, last name, email, password, gender)"
          )
        );
      } else {
        const checkUser = await User.findOne({ email: req.body.TeacherEmail });
        if (checkUser) {
          return next(createError(500, "The email has already existed in database"));
        }
        const createTeacher = await User.create({
          firstName: req.body.TeacherFirstName,
          lastName: req.body.TeacherLastName,
          email: req.body.TeacherEmail,
          password: req.body.TeacherPassword,
          gender: req.body.Gender,
          permission: "Teacher",
        });
      }
      res.redirect("/admin/manageteachers");
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/editcategory/patch
const updateCourseCategory = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const { CategoryID, CategoryName, CategoryImage } = req.body;
      const courseUpdate = await CourseCategory.findByIdAndUpdate(
        {
          _id: CategoryID,
        },
        {
          name: CategoryName,
          image: CategoryImage,
        },
        { new: true, runValidators: true }
      );
      const languageUpdate = await CourseLanguage.updateMany(
        {
          categoryId: CategoryID,
        },
        {
          categoryName: CategoryName,
        }
      );
      if (!courseUpdate) {
        return next(createError(400, "Please provide a course"));
      }
      res.redirect("/admin/managecategory");
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

const updateLanguageCategory = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const {
        CurrentLanguageName,
        CurrentCategoryName,
        LanguageID,
        LanguageName,
        CategoryName,
        LanguageImage,
      } = req.body;
      // xoá language trong category cũ
      const findCurrentCategory = await CourseCategory.findOne({
        name: CurrentCategoryName,
      });
      const findNewCategory = await CourseCategory.findOne({ name: CategoryName });

      let currentLanguageList = findCurrentCategory.languageList;
      let newLanguageList = findNewCategory.languageList;

      const indexOf = currentLanguageList.findIndex(language => {
        return language._id == LanguageID;
      });
      currentLanguageList.splice(indexOf, 1);
      if (CurrentCategoryName === CategoryName) {
        newLanguageList = currentLanguageList;
      }
      const objLanguage = { _id: LanguageID, name: LanguageName };
      const checkLanguageExist = newLanguageList.some(language => {
        return language.name === objLanguage.name;
      });
      if (checkLanguageExist) {
        return next(
          createError(500, `Already have this language in ${findNewCategory.name}`)
        );
      } else {
        newLanguageList.push(objLanguage);

        await CourseCategory.findByIdAndUpdate(
          {
            _id: findCurrentCategory._id,
          },
          {
            languageList: currentLanguageList,
          },
          { new: true, runValidators: true }
        );
        await CourseCategory.findByIdAndUpdate(
          {
            _id: findNewCategory._id,
          },
          {
            languageList: newLanguageList,
          },
          { new: true, runValidators: true }
        );
      }

      const languageUpdate = await CourseLanguage.findByIdAndUpdate(
        {
          _id: LanguageID,
        },
        {
          name: LanguageName,
          image: LanguageImage,
          categoryName: CategoryName,
          categoryId: findNewCategory._id,
        },
        { new: true, runValidators: true }
      );
      if (!languageUpdate) {
        return next(createError(400, "Please provide a language"));
      }
      res.redirect("/admin/managelanguage");
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};
//{{URL}}/admin/editcategory/del
const deleteCourseCategory = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const { CategoryID } = req.body;
      const categoryCheck = await CourseCategory.findById({ _id: CategoryID });
      if (!categoryCheck) {
        return next(createError(404, "This category doesn't exist"));
      }
      if (categoryCheck.languageList.length > 0) {
        return next(
          createError(400, "Cant delete a category when having languages")
        );
      }
      const deleteCategory = await CourseCategory.findByIdAndRemove({
        _id: CategoryID,
      });
      res.redirect("/admin/managecategory");
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

//{{URL}}/admin/editcategory/del
const deleteCourseLanguage = async function (req, res, next) {
  if (!req.session.authUser) {
    res.render("vwAccount/login");
  }
  else {
    const userChecking = await User.findOne({ _id: req.session.authUser._id }); // lấy ra đúng user đang login
    if (userChecking.permission === "Admin") {
      const { LanguageID } = req.body;
      const languageCheck = await CourseLanguage.findById({ _id: LanguageID });
      if (!languageCheck) {
        return next(createError(404, "This language doesn't exist"));
      }
      if (languageCheck.courseList.length > 0) {
        return next(
          createError(500, "Cant delete a language when having courses ")
        );
      }
      const category = await CourseCategory.findById({
        _id: languageCheck.categoryId,
      });
      const indexOf = category.languageList.findIndex(language => {
        return language._id === LanguageID;
      });
      category.languageList.splice(indexOf, 1);
      const updateCategory = await CourseCategory.findByIdAndUpdate(
        {
          _id: category._id,
        },
        {
          languageList: category.languageList,
        },
        { new: true, runValidators: true }
      );
      const deleteLanguage = await CourseLanguage.findByIdAndRemove({
        _id: LanguageID,
      });
      res.redirect("/admin/managelanguage");
    } else {
      return next(createError(500, "User has no permission "));
    }
  }
};

export {
  register,
  getAllUsers,
  getAllStudents,
  getAllTeachers,
  getAllCourses,
  getAllCourseCategories,
  getAllCourseLanguages,
  getEditUserPage,
  getEditCoursePage,
  getEditCategoryPage,
  getEditLanguagePage,
  getAddCategoryPage,
  getAddLanguagePage,
  getAddTeacherPage,
  viewLanguagesByID,
  viewCoursesByID,
  viewCoursesByTeacherID,
  viewFeedBacksByID,
  // viewRatingByID,
  updateUserPermission,
  updateCourseDisable,
  deleteUser,
  deleteCourse,
  createCourseCategory,
  createTeacherAccount,
  createLanguage,
  updateCourseCategory,
  updateLanguageCategory,
  deleteCourseCategory,
  deleteCourseLanguage,
};

//flow
/* 
Khi getUser thì sẽ phải tìm user có id đúng với params được cấp và lấy dữ liệu
Khi getAllUsers thì sẽ lấy ra tất cả các user tồn tại trong database
Khi deleteUser thì sẽ phải tìm user có id đúng với params được cấp và delete
Khi updateUser thì sẽ phải tìm user có id đúng với params được cấp và update

*/
