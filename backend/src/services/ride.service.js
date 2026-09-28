import rideModel from "../models/ride.model.js";
import { getDistance } from "./maps.service.js";
import crypto from "crypto";

async function getFare({
    pickup,
    destination
}) {

    if (!pickup || !destination) {
        throw new Error("Pickup and Destination are required");
    }

    const distanceTime = await getDistance(
        pickup,
        destination
    );

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(
            baseFare.auto +
            (distanceTime.distance.value / 1000) * perKmRate.auto +
            (distanceTime.duration.value / 60) * perMinuteRate.auto
        ),

        car: Math.round(
            baseFare.car +
            (distanceTime.distance.value / 1000) * perKmRate.car +
            (distanceTime.duration.value / 60) * perMinuteRate.car
        ),

        moto: Math.round(
            baseFare.moto +
            (distanceTime.distance.value / 1000) * perKmRate.moto +
            (distanceTime.duration.value / 60) * perMinuteRate.moto
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
        vehicleType,
        fare: fare[vehicleType],
        otp
    });

    return ride;
};


export default {
    getFare,
    createRide
};