import express from 'express'
const adminRouter = express.Router()

import {
    getAllCourses,
    getAllStudents,
    getAllTeachers,
    getAllCourseCategories,
    // deleteUser, getAllUsers, getUser, updateUser
    getAllUsers,
    getEditPage,
    updateUserPermission,
    deleteUser
} from '../controllers/admin.controller'
adminRouter.route('/edituser').get(getEditPage)
adminRouter.route('/edituser/patch').post(updateUserPermission)
adminRouter.route('/edituser/del').post(deleteUser)
adminRouter.route('/').get(getAllUsers)
adminRouter.route('/managestudents').get(getAllStudents)
adminRouter.route('/manageteachers').get(getAllTeachers)
adminRouter.route('/managecourses').get(getAllCourses)
adminRouter.route('/managecoursecategory').get(getAllCourseCategories)
adminRouter.route('/managecoursecategory/add').get().post()
adminRouter.route('/managecoursecategory/edit').get().patch()

export default adminRouter