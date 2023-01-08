import express from 'express'
const adminRouter = express.Router()

import {
  getAllCourses,
  getAllStudents,
  getAllTeachers,
  getAllCourseCategories,
  // deleteUser, getAllUsers, getUser, updateUser
  getAllUsers,
  getEditUserPage,
  getEditCoursePage,
  getAddCategoryPage,
  getAddTeacherPage,
  updateUserPermission,
  updateCourseDisable,
  deleteUser,
  deleteCourse,
  createCourseCategory,
  createTeacherAccount,
  getEditCategoryPage,
  updateCourseCategory,
  deleteCourseCategory,
  viewLanguagesByID,
  viewCoursesByID,
  viewCoursesByTeacherID,
  register,
  getAllCourseLanguages,
  getAddLanguagePage,
  createLanguage,
  getEditLanguagePage,
  updateLanguageCategory,
  deleteCourseLanguage,
  viewFeedBacksByID,
  // viewRatingByID
} from '../controllers/admin.controller'
adminRouter.route('/register').post(register)
adminRouter.route('/edituser').get(getEditUserPage)
adminRouter.route('/editcourse').get(getEditCoursePage)
adminRouter.route('/edituser/patch').post(updateUserPermission)
adminRouter.route('/editcourse/patch').post(updateCourseDisable)
adminRouter.route('/editcategory').get(getEditCategoryPage)
adminRouter.route('/editlanguage').get(getEditLanguagePage)
adminRouter.route('/editcategory/patch').post(updateCourseCategory)
adminRouter.route('/editlanguage/patch').post(updateLanguageCategory)
adminRouter.route('/editcategory/del').post(deleteCourseCategory)
adminRouter.route('/editlanguage/del').post(deleteCourseLanguage)
adminRouter.route('/edituser/del').post(deleteUser)
adminRouter.route('/editcourse/del').post(deleteCourse)

adminRouter.route('/').get(getAllUsers)
adminRouter.route('/managestudents').get(getAllStudents)
adminRouter.route('/manageteachers').get(getAllTeachers)
adminRouter.route('/managecourses').get(getAllCourses)
adminRouter.route('/managecategory').get(getAllCourseCategories)
adminRouter.route('/managelanguage').get(getAllCourseLanguages)
adminRouter.route('/addcategory').get(getAddCategoryPage)
adminRouter.route('/addlanguage').get(getAddLanguagePage)
adminRouter.route('/addteacher').get(getAddTeacherPage)
adminRouter.route('/managecategoryid').get(viewLanguagesByID)
adminRouter.route('/managelanguageid').get(viewCoursesByID)
adminRouter.route('/manageteachersid').get(viewCoursesByTeacherID)
adminRouter.route('/managefeedbacksid').get(viewFeedBacksByID)
// adminRouter.route('/manageratingid').get(viewRatingByID)
adminRouter.route('/addcategory/post').post(createCourseCategory)
adminRouter.route('/addlanguage/post').post(createLanguage)

adminRouter.route('/addteacher/post').post(createTeacherAccount)

export default adminRouter