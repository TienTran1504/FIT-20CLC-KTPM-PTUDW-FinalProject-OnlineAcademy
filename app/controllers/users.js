import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors';
import bcrypt from 'bcryptjs';
// {{URL}}/user
const getUserInfor = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json({
        user
    })
}

// {{URL}}/user/updatepassword
const updatePassword = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || !currentPassword) {
        throw new BadRequestError("Please enter new password, current password")
    }
    else {
        //compare password
        const isPasswordCorrect = await user.comparePassword(currentPassword)
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError("Invalid password credentials");
        }
        else {
            //Hashing password
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(newPassword, salt)
            const updatePassword = {
                password: passwordHashed,
            };
            const userUpdate = await User.findByIdAndUpdate(
                {
                    _id: user._id,
                },
                updatePassword,
                { new: true, runValidators: true }
            )
            res.status(StatusCodes.OK).json({
                msg: "Changing password successfully",
                id: userUpdate._id,
                name: userUpdate.name,
                password: userUpdate.password,
                email: userUpdate.email,
                permission: userUpdate.permission
            });
        }
    }

}

export {
    updatePassword,
    getUserInfor,
}

/*flow
Khi updatePassword sẽ cho nhập mật khẩu cũ và mật khẩu mới nếu nhập mật khẩu cũ đúng thì sẽ đổi thành công
Khi getUserInfor sẽ lấy dữ liệu của user đang đăng nhập
*/