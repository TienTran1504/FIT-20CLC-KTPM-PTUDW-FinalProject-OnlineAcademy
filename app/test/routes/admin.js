import express from 'express'
const adminRouter = express.Router()


import {
    getUser,
    getAllUsers,
    deleteUser,
    updateUser,
} from '../../controllers/admin'

adminRouter.route('/').get(getAllUsers)
adminRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)

export default adminRouter