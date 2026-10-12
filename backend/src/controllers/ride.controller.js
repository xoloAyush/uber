import rideService from "../services/ride.service.js";
import { validationResult } from "express-validator";
import {
    getAddressCoordinate,
    getCaptainsInTheRadius
} from "../services/maps.service.js";import rideModel from "../models/ride.model.js";
import { sendMessageToSocketId } from "../socket.js";
import user from "../models/user.model.js";

export const createRide = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Invalid input",
            errors: errors.array()
        });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {

        const ride = await rideService.createRide({ user: req.user, pickup, destination, vehicleType })

        const pickupCoordinates = await     getAddressCoordinate(pickup);

        const captainsInRadius = await getCaptainsInTheRadius(pickupCoordinates.latitude, pickupCoordinates.longitude, 2);

        ride.otp= ''

         const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(captain => {

            const sendmsg = sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

            // console.log("sendMessageToSocketId : ",sendmsg)

        })

        return res.status(201).json({
            success: true,
            message: "Ride created successfully",
            rides: ride
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }

}

export const getFare = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Invalid input",
            errors: errors.array()
        });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare({ pickup, destination });

        return res.status(200).json({
            success: true,
            message: "Fare fetched successfully",
            fares: fare
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

export const confirmRide = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Invalid input",
            errors: errors.array()
        });
    }

    const { rideId } = req.body;

    try {

        const ride = await rideService.confirmRide({
            rideId,
            captain: req.user
        });

        console.log("Ride confirmed:", ride);

        // Get latest user document
        const userData = await user.findById(ride.user._id);

        console.log("🚕 CONFIRM RIDE");
        console.log("User ID:", userData?._id);
        console.log("🔥 USER SOCKET:", userData?.socketId);

        if (!userData?.socketId) {
            console.log("❌ User socketId not found");
            return res.status(500).json({
                message: "User socket not found"
            });
        }

        sendMessageToSocketId(userData.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });
    }
};

export const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    const cleanOtp = otp.trim();

    try {
        const ride = await rideService.startRide({ rideId, otp: cleanOtp, captain: req.user });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.user });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}