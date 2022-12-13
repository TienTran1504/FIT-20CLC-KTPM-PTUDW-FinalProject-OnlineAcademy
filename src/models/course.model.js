import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    //required: name, typeOf, price
    name: {
      type: String,
      required: [true, "Please provide Course name"],
      maxlength: 100,
      trim: true,
      unique: true,
    },
    briefDescription: {
      type: String,
      trim: true,
    },
    detailDescription: {
      type: String,
      trim: true,
    },
    // status: {
    //     type: String,
    //     enum: ['in progress', 'completed'],
    //     default: 'in progress',
    //     trim: true,
    // },
    image: {
      type: String,
      default: "./default.png",
    },
    studentList: {
      type: Array,
      default: [],
    },
    ratingList: {
      type: Array,
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be above 0.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    price: {
      type: Number,
      required: [true, "Please provide price of Course"],
    },
    //mỗi khi feedback sẽ lưu một object có id ,name, content
    feedback: {
      type: Array,
      default: [],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "CourseCategory",
      required: [true, "Please provide category of course"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
); // timestamps -> key createdAt, updatedAt

export default mongoose.model("Course", CourseSchema);

/*
model sẽ có: name, category, description, status( của khoá học ), image, studentList(danh sách sinh viên đăng ký),createdBy( lưu id của giáo viên tạo khoá học)
            rating, ratingList(danh sách sinh viên đã rating và điểm rating), price, feedback(danh sách sinh viên đã feedback, nội dung feedback)
*/
