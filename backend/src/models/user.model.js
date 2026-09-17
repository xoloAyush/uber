import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "First name must be at least 3 characters long"],
            maxlength: [20, "First name must be at most 20 characters long"]
        },
        lastname: {
            type: String,
            trim: true,
            minlength: [3, "Last name must be at least 3 characters long"],
            maxlength: [20, "Last name must be at most 20 characters long"]
        }
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
        maxlength: [30, "Email must be at most 30 characters long"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [80, "Password must be at most 20 characters long"],
        select: false
    },
    socketId: {
        type: String
    }
});


// Static method
userSchema.statics.generateHashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


// Instance method
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


// Instance method
userSchema.methods.generateAuthToken = function () {

    const token = jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT,
        {
            expiresIn: "24h"
        }
    );

    return token;
};


const userModel = mongoose.model("user", userSchema);

export default userModel;