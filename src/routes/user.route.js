import express from 'express'
const userRouter = express.Router()
import {
    updatePassword,
    getUserInfor,
} from '../controllers/user.controller'



userRouter.route('/').get(getUserInfor)
userRouter.route('/update-password').patch(updatePassword)

export default userRouter