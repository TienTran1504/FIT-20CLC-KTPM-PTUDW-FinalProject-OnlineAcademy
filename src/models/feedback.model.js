import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
    {
        content: {
            type: String,
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


