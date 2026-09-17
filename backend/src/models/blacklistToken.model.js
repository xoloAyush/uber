import mongoose from "mongoose";

const blockListSchema = new mongoose.Schema(

    {
        token: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        createdAt: {
            type: Date,
            default: Date.now,
            expires: "1d"
        }

    }
)

export default mongoose.model("blacklistToken", blockListSchema)