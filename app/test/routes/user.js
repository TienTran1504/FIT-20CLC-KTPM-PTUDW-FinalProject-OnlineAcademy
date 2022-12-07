import express from 'express'
const userRouter = express.Router()


import {
    updatePassword,
    getUserInfor,
} from '../../controllers/users'
userRouter.route('/').get(getUserInfor)
userRouter.route('/updatepassword').patch(updatePassword)

export default userRouter