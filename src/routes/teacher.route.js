import express from 'express'
const teacherRouter = express.Router()


import {
    getOwnerCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../controllers/teacher.controller'
teacherRouter.route('/courses').post(createCourse).get(getOwnerCourses)
teacherRouter.route('/courses/:id').patch(updateCourse).delete(deleteCourse)

export default teacherRouter