import express from 'express'
const adminRouter = express.Router()

import {
    deleteUser, getAllUsers, getUser, updateUser
} from '../controllers/admin.controller'

adminRouter.route('/').get(getAllUsers)
adminRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)

export default adminRouter