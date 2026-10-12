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

const confirmRide = async ({ rideId, captain }) => {

    if (!rideId || !captain) {
        throw new Error("Ride ID and Captain are required");
    }

    await rideModel.findByIdAndUpdate(rideId, {
        captain: captain,
        status: "confirmed"
    });

    const ride = await rideModel.findById(rideId).populate("user").populate("captain").select('+otp');

    if(!ride) {
        throw new Error("Ride not found");
    }

    return ride;

}

const startRide = async ({ rideId, otp, captain }) => {

    if (!rideId || !otp || !captain) {
        throw new Error("Ride ID, OTP and Captain ID are required");
    }

    console.log("========== START RIDE SERVICE ==========");
    console.log("rideId:", rideId);
    console.log("otp:", otp);
    console.log("captain:", captain._id);

    const ride = await rideModel
        .findById(rideId)
        .populate("user")
        .populate("captain")
        .select("+otp");

    if (!ride) {
        throw new Error("Ride is not found");
    }

    console.log("Current ride status:", ride.status);
    console.log("Database OTP:", ride.otp);
    console.log("Received OTP:", otp);

    if (ride.status !== "confirmed") {
        throw new Error("Ride is not confirmed");
    }

    if (ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    // Change the document itself
    ride.status = "ongoing";

    // Save the changed document
    await ride.save();

    console.log("✅ Ride started");
    console.log("✅ New status:", ride.status);

    return ride;
};

const endRide = async ({ rideId, captain }) => {

    if (!rideId || !captain) {
        throw new Error("Ride ID and Captain ID are required");
    }

    const ride = await rideModel
        .findById(rideId)
        .populate("user")
        .populate("captain")
        .select("+otp");

    if (!ride) {
        throw new Error("Ride is not found");
    }

    console.log("========== END RIDE SERVICE ==========");
    console.log("Ride ID:", rideId);
    console.log("Current status:", ride.status);
    console.log("Captain:", captain._id);

    if (ride.status !== "ongoing") {
        throw new Error("Ride is not ongoing");
    }

    ride.status = "completed";

    await ride.save();

    console.log("✅ Ride completed");
    console.log("✅ New status:", ride.status);

    return ride;
};

export default {
    getFare,
    createRide,
    confirmRide,
    startRide,
    endRide
};