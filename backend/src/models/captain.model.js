import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
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
            // minlength: [3, "Last name must be at least 3 characters long"],
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
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },

    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
});


// Static method
captainSchema.statics.generateHashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


// Instance method
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


// Instance method
captainSchema.methods.generateAuthToken = function () {

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


const captainModel = mongoose.model("captain", captainSchema);

export default captainModel;