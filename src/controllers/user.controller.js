import bcrypt from "bcryptjs";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";

// {{URL}}/user
const getUserInfor = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({
    user,
  });
};

// {{URL}}/user/updatepassword
const updatePassword = async (req, res) => {
  const id = "63aaaf7dbe355f57283b0600";
  // const user = await User.findOne({ _id: req.user.userId });
  const user = await User.findById({ _id: id }).lean();
  const { currentPassword, newPassword } = req.body;
  console.log(currentPassword, newPassword);
  if (!newPassword || !currentPassword) {
    throw createError.BadRequest("Please enter new password, current password");
    console.log("Bad request");
  } else {
    //compare password
    const isPasswordCorrect = await user.comparePassword(currentPassword);
    if (!isPasswordCorrect) {
      throw create.Unauthorized("Invalid password credentials");
      console.log("invalid");
    } else {
      console.log("valid");
      //Hashing password
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(newPassword, salt);
      const updatePassword = {
        password: passwordHashed,
      };
      const userUpdate = await User.findByIdAndUpdate(
        {
          _id: user._id,
        },
        updatePassword,
        { new: true, runValidators: true }
      );
      // res.status(StatusCodes.OK).json({
      //   msg: "Changing password successfully",
      //   id: userUpdate._id,
      //   name: userUpdate.name,
      //   password: userUpdate.password,
      //   email: userUpdate.email,
      //   permission: userUpdate.permission,
      // });
    }
  }
  // res.redirect("/student/account_security");
};

export { updatePassword, getUserInfor };

/*flow
Khi updatePassword sẽ cho nhập mật khẩu cũ và mật khẩu mới nếu nhập mật khẩu cũ đúng thì sẽ đổi thành công
Khi getUserInfor sẽ lấy dữ liệu của user đang đăng nhập
*/
