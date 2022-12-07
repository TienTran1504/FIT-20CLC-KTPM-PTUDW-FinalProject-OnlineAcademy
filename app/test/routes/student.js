import express from 'express'
const studentRouter = express.Router()


import {
    getCourseList,
    updateStatusCourse,
    removeCourse,
    addCourse,
} from '../../controllers/students'
studentRouter.route('/courses').get(getCourseList)
studentRouter.route('/courses/:courseId').patch(updateStatusCourse).post(addCourse)
studentRouter.route('/courses/delete/:courseId').patch(removeCourse)

export default studentRouter