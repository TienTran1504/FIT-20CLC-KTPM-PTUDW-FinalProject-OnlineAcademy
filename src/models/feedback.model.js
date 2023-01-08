import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    numberRated: {
      type: Number,
      min: [0, "Rating must above 0"],
      max: [5, "Rating must below 5"],
      default: 0,
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

export default mongoose.model("Feedback", FeedbackSchema);
