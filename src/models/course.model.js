import mongoose from "mongoose";
import Lecture from "./lecture.model";
import FeedBack from "./feedback.model";

const CourseSchema = new mongoose.Schema(
  {
    //required: name, typeOf
    name: {
      type: String,
      required: [true, "Please provide course title"],
      maxlength: 100,
      trim: true,
      unique: true,
    },
    briefDescription: {
      type: String,
      trim: true,
      default: "",
    },
    detailDescription: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["in progress", "completed"],
      default: "in progress",
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    studentList: {
      type: Array,
      default: [],
    },
    viewList: {
      type: Array,
      default: [],
    },
    price: {
      type: Number,
      min: [0, "Price must be above 0"],
      max: [1000, "Price must be below 1000"],
      default: 0,
    },
    feedbackList: {
      type: Array,
      default: [],
    },
    // category: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "CourseCategory",
    //   required: [true, "Please provide category of course"],
    // },
    languageId: {
      type: mongoose.Types.ObjectId,
      ref: "CourseLanguage",
      required: [true, "Please provide language of course"],
    },
    languageName: {
      type: String,
      required: [true, "Please provide language name"],
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "CourseCategory",
      required: [true, "Please provide category of course"],
    },
    categoryName: {
      type: String,
      ref: "CourseLanguage",
      required: [true, "Please provide category's id"],
    },
    lecture: {
      type: Array,
      default: [],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    disable: {
      type: String,
      enum: ["True", "False"],
      default: "False",
    },
  },
  { timestamps: true }
); // timestamps -> key createdAt, updatedAt

CourseSchema.index({
  name: "text",
  languageName: "text",
  categoryName: "text",
});

CourseSchema.pre("deleteOne", function (next) {
  
  Lecture.deleteMany({ createdIn: courseID }, function (err, result) {
    if (err) {
      next(err);
    }
    next();
  });
  FeedBack.deleteMany({ createdIn: courseID }, function (err, result) {
    if (err) {
      next(err);
    }
    next();
  });
});
export default mongoose.model("Course", CourseSchema);

/*
model sẽ có: name, category, description, status( của khoá học ), image, studentList(danh sách sinh viên đăng ký),createdBy( lưu id của giáo viên tạo khoá học)
            rating, ratingList(danh sách sinh viên đã rating và điểm rating), price, feedback(danh sách sinh viên đã feedback, nội dung feedback)
*/
