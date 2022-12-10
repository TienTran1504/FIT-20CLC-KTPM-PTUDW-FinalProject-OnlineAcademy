import User from "../models/user.model";
import createError from "http-errors";

//{{URL}}/admin
const getAllUsers = async (req, res) => {
  const userCheck = await User.findOne({ _id: req.user.userId }); // lấy ra đúng user đang login
  if (userCheck.permission === "admin") {
    const { search, limit } = req.query;
    const users = await User.find({});
    let sortedUsers = [...users];
    if (search) {
      sortedUsers = sortedUsers.filter((user) => {
        return user.name.startsWith(search);
      });
    }
    if (limit) {
      sortedUsers = sortedUsers.slice(0, Number(limit));
    }
    if (sortedUsers.length < 1) {
      return res
        .status(StatusCodes.OK)
        .json({ msg: "No users match your search" });
    }
    res.status(StatusCodes.OK).json({ sortedUsers, count: sortedUsers.length });
  } else {
    throw createError.Unauthorized();
  }
};
// {{URL}}/admin/:id
const getUser = async (req, res) => {
  const userCheck = await User.findOne({ _id: req.user.userId });
  if (userCheck.permission === "admin") {
    const {
      params: { id: userId },
    } = req; // req.user.userId, req.params.id

    const user = await User.findOne({
      _id: userId,
    });
    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`);
    }
    res.status(StatusCodes.OK).json({ user });
  } else {
    throw createError.Unauthorized();
  }
};
// {{URL}}/admin/:id
const deleteUser = async (req, res) => {
  const userCheck = await User.findOne({ _id: req.user.userId });
  if (userCheck.permission === "admin") {
    const {
      params: { id: userId },
    } = req;

    const user = await User.findByIdAndRemove({
      _id: userId,
    });

    if (!user) {
      throw createError.NotFound();
    }
    res
      .status(StatusCodes.OK)
      .json({ msg: `Delete user ID: ${userId} successfully ` });
  } else {
    throw createError.Unauthorized();
  }
};
// {{URL}}/admin/:id
const updateUser = async (req, res) => {
  const userCheck = await User.findOne({ _id: req.user.userId });
  if (userCheck.permission === "admin") {
    const {
      body: { permission },
      params: { id: userId },
    } = req;

    if (permission === "") {
      throw createError.BadRequest();
    }
    const user = await User.findByIdAndUpdate(
      {
        _id: userId,
        permission: permission,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      throw createError.NotFound();
    }
    res.status(StatusCodes.OK).json({ user });
  } else {
    throw createError.Unauthorized();
  }
};

export { getUser, getAllUsers, deleteUser, updateUser };

//flow
/* 
Khi getUser thì sẽ phải tìm user có id đúng với params được cấp và lấy dữ liệu
Khi getAllUsers thì sẽ lấy ra tất cả các user tồn tại trong database
Khi deleteUser thì sẽ phải tìm user có id đúng với params được cấp và delete
Khi updateUser thì sẽ phải tìm user có id đúng với params được cấp và update

*/
