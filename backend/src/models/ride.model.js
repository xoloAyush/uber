import mongoose from "mongoose";


const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "captain",

    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending',
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,

    },
    duration: {
        type: Number,

    },
    vehicleType: {
        type: String,
        enum: ["auto", "car", "moto"],
        required: true
    },

    paymentID: {
        type: String
    },
    orderID: {
        type: String
    },
    signature: {
        type: String
    },
    otp: {
        type: String,
        select: false,
        required: true
    }
})


const rideModel = mongoose.model("ride", rideSchema)

export default rideModel