import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide Course name"],
            maxlength: 100,
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            trim: true,
        },
        video: {
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

export default mongoose.model("Topic", TopicSchema);


