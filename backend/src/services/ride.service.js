import rideModel from "../models/ride.model.js";
import { getDistance } from "./maps.service.js";
import crypto from "crypto";

async function getFare({ pickup, destination }) {

    if (!pickup || !destination) {
        throw new Error("Pickup and Destination are required");
    }

    const distanceTime = await getDistance(pickup, destination);

    const baseFare = {
        auto: 20,
        car: 35,
        moto: 15
    };

    const perKmRate = {
        auto: 5,
        car: 8,
        moto: 4
    };

    const perMinuteRate = {
        auto: 0.5,
        car: 1,
        moto: 0.5
    };

    const distanceKm = distanceTime.distance.value / 1000;
    const durationMinutes = distanceTime.duration.value / 60;

    const fare = {
        auto: Math.round(
            baseFare.auto +
            distanceKm * perKmRate.auto +
            durationMinutes * perMinuteRate.auto
        ),

        car: Math.round(
            baseFare.car +
            distanceKm * perKmRate.car +
            durationMinutes * perMinuteRate.car
        ),

        moto: Math.round(
            baseFare.moto +
            distanceKm * perKmRate.moto +
            durationMinutes * perMinuteRate.moto
        )
    };

    return fare;
}


function getOtp(num) {

    return crypto
        .randomInt(
            10 ** (num - 1),
            10 ** num
        )
        .toString();
}


const createRide = async ({
    user,
    pickup,
    destination,
    vehicleType
}) => {

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }

    const fare = await getFare({
        pickup,
        destination
    });

    if (!fare) {
        throw new Error("Could not calculate fare");
    }

    const otp = getOtp(6);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        vehicleType: vehicleType,
        fare: fare[vehicleType],
        otp
    });

    return ride;
};


export default {
    getFare,
    createRide
};