import rideService from "../services/ride.service.js";
import { validationResult } from "express-validator";


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