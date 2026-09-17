import dotenv from 'dotenv'
dotenv.config()

import mongoose from "mongoose";

function connectDB() {

    return mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB is connected")
        })
        .catch((e) => {
            console.log("DB not connected", e)
        })
}

export default connectDB