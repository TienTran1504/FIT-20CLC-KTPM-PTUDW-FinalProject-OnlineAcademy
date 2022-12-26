import mongoose from "mongoose";

const CourseLanguageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide course category name"],
      trim: true,
    },
    categoryName: {
      type: String,
      ref: "CourseCategory",
      required: [true, "Please provide course category name"],
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "CourseCategory",
      required: [true, "Please provide category id of course"],
    },
    courseList: {
      type: Array,
      default: [],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      // required: [true, 'Please provide user']
    },
    image: {
      type: String,
    }
  },
  { timestamps: true }
); // timestamps -> key createdAt, updatedAt

export default mongoose.model("CourseLanguage", CourseLanguageSchema);
