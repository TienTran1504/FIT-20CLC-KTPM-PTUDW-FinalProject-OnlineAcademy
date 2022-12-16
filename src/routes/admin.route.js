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
  getAddCategoryPage,
  updateUserPermission,
  deleteUser,
  createCourseCategory,
  getEditCategoryPage,
  updateCourseCategory,
  deleteCourseCategory,
  viewCoursesByID,
  register,
} from '../controllers/admin.controller'
adminRouter.route('/register').post(register)
adminRouter.route('/edituser').get(getEditUserPage)
adminRouter.route('/edituser/patch').post(updateUserPermission)
adminRouter.route('/edituser/del').post(deleteUser)
adminRouter.route('/editcategory').get(getEditCategoryPage)
adminRouter.route('/editcategory/patch').post(updateCourseCategory)
adminRouter.route('/editcategory/del').post(deleteCourseCategory)
adminRouter.route('/').get(getAllUsers)
adminRouter.route('/managestudents').get(getAllStudents)
adminRouter.route('/manageteachers').get(getAllTeachers)
adminRouter.route('/managecourses').get(getAllCourses)
adminRouter.route('/managecategory').get(getAllCourseCategories)
adminRouter.route('/addcategory').get(getAddCategoryPage)
adminRouter.route('/managecoursesid').get(viewCoursesByID)
adminRouter.route('/addcategory/post').post(createCourseCategory)

export default adminRouter