import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide Lecture name"],
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    video: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
    },
    createdIn: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: [true, "Please provide course"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
); // timestamps -> key createdAt, updatedAt

export default mongoose.model("Lecture", LectureSchema);
