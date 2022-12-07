import express from 'express'
const coursesRouter = express.Router()

import {
    getAllCourses,
    getCourse,
} from '../../controllers/courses'

coursesRouter.route('/').get(getAllCourses)
coursesRouter.route('/:id').get(getCourse)
export default coursesRouter