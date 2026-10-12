import React, { useEffect, useRef, useState } from "react";
import LocationText from "./LocationText ";

const WaitingforDriver = (props) => {

    const ride = props.ride;
    const captain = ride?.captain;

    const [openLocation, setOpenLocation] = useState(null);

    const pickupRef = useRef(null);
    const destinationRef = useRef(null);


    // Close tooltip when clicking outside
    useEffect(() => {

        const handleOutsideClick = (event) => {

            const clickedPickup =
                pickupRef.current?.contains(event.target);

            const clickedDestination =
                destinationRef.current?.contains(event.target);

            // Clicked somewhere outside both locations
            if (!clickedPickup && !clickedDestination) {
                setOpenLocation(null);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "click",
                handleOutsideClick
            );
        };

    }, []);


    return (
        <div className="w-full">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <h2 className="text-2xl font-bold">
                    Waiting for Driver
                </h2>

                <button
                    onClick={() => {
                        props.setWaitingForDriver(false);
                    }}
                    className="text-3xl text-gray-500 hover:text-black cursor-pointer"
                >
                    <i className="ri-arrow-down-wide-fill"></i>
                </button>

            </div>


            {/* Vehicle Information */}
            <div className="flex flex-col gap-4 bg-gray-100 p-4">

                {/* Driver + Vehicle */}
                <div className="w-full flex items-center justify-between px-4 py-3">

                    {/* Driver Image */}
                    <div className="w-19 h-19 overflow-hidden rounded-full flex-shrink-0">

                        <img
                            src="/driver.jfif"
                            alt={captain?.fullname?.firstname || "Driver"}
                            className="w-full h-full object-cover"
                        />

                    </div>


                    {/* Driver Details */}
                    <div className="flex flex-col items-end justify-center">

                        <h3 className="text-xl font-medium">
                            {captain?.fullname?.firstname}{" "}
                            {captain?.fullname?.lastname}
                        </h3>

                        <h3 className="text-xl font-bold">
                            {captain?.vehicle?.plate}
                        </h3>

                        <p className="text-sm capitalize">
                            {captain?.vehicle?.model}
                        </p>

                        <p className="text-lg font-medium capitalize">
                            OTP: {ride?.otp}
                        </p>

                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">
                                ★
                            </span>

                            <span className="text-sm font-medium">
                                4.9
                            </span>
                        </div>

                    </div>

                </div>


                {/* Ride Details */}
                <div className="flex-1">

                    <div className="flex items-center justify-between">

                        <h3 className="text-xl font-semibold capitalize">
                            {captain?.vehicle?.vehicleType}
                        </h3>

                        <h3 className="text-xl font-bold">
                            ₹{ride?.fare}
                        </h3>

                    </div>


                    {/* Capacity */}
                    <p className="text-sm text-gray-600 mt-1">
                        <i className="ri-user-3-fill"></i>{" "}
                        {captain?.vehicle?.capacity} passengers
                    </p>


                    {/* Vehicle Color */}
                    <p className="text-sm text-gray-600 mt-1">
                        <i className="ri-car-line"></i>{" "}
                        {captain?.vehicle?.color}
                    </p>


                    {/* Pickup */}
                    <LocationText
                        ref={pickupRef}
                        text={ride?.pickup}
                        isOpen={openLocation === "pickup"}
                        onToggle={() => {
                            setOpenLocation(
                                openLocation === "pickup"
                                    ? null
                                    : "pickup"
                            );
                        }}
                    />


                    {/* Destination */}
                    <LocationText
                        ref={destinationRef}
                        text={ride?.destination}
                        isOpen={openLocation === "destination"}
                        onToggle={() => {
                            setOpenLocation(
                                openLocation === "destination"
                                    ? null
                                    : "destination"
                            );
                        }}
                    />

                </div>

            </div>

        </div>
    );
};

export default WaitingforDriver;