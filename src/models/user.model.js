import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    //required: name, email, password
    // register: name, email, password
    // login: email, password
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid emai",
      ],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["nam", "nữ"],
      default: "nam",
    },
    permission: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    courseList: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//Hashing password
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create json web token
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

// compare password to login
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
export default mongoose.model("User", UserSchema);

/*
model sẽ có: name, email, password, gender, image, permission (phân hệ ng dùng), courseList(danh sách khoá học của sinh viên),
*/
