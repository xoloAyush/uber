import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {

    const rideData = {
        rider: {
            name: "Harsh Patel",
            image: "https://images.unsplash.com/photo-1583692331501-5339b76cbf1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
            distance: "2.2 KM",
        },

        pickup: {
            address: "562/11-A",
            location: "Kankariya Talab, Bhopal",
        },

        destination: {
            address: "562/11-A",
            location: "Kankariya Talab, Bhopal",
        },

        fare: "₹193.20",
        paymentMethod: "Cash",
    };

    const submitHandler = (e) => {
        e.preventDefault();

        setOTP
        console.log("Form submitted");
    }

    const [otp, setOTP] = useState('')

    return (
        <div className="w-full h-screen pb-4 rounded-md border border-gray-200">

            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">

                <h2 className="text-2xl font-bold">
                    Confirm this Ride to Start
                </h2>

                {/* Close */}
                <button
                    onClick={() => props.setConfirmRidePopUp(false)}
                    className="text-gray-400 hover:text-black text-2xl cursor-pointer"
                >
                    <i className="ri-close-line"></i>
                </button>

            </div>


            {/* Rider Information */}
            <div className="mx-3 flex items-center justify-between rounded-md px-2 py-2 bg-gray-200 mt-5">

                {/* Rider */}
                <div className="flex items-center gap-3 ">

                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                        <img
                            src={rideData.rider.image}
                            alt={rideData.rider.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h3 className="font-semibold ">
                        {rideData.rider.name}
                    </h3>

                </div>


                {/* Distance */}
                <p className="font-bold ">
                    {rideData.rider.distance}
                </p>

            </div>


            {/* Ride Details */}
            <div className="px-4">


                {/* Pickup */}
                <div className="flex gap-4 py-4 border-b">

                    {/* Icon */}
                    <div className="flex justify-center pt-1">
                        <i className="ri-map-pin-user-fill text-xl text-gray-700"></i>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="font-semibold text-lg">
                            {rideData.pickup.address}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {rideData.pickup.location}
                        </p>
                    </div>

                </div>


                {/* Destination */}
                <div className="flex gap-4 py-4 border-b">

                    {/* Icon */}
                    <div className="flex justify-center pt-1">
                        <i className="ri-map-pin-fill text-xl text-black"></i>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="font-semibold text-lg">
                            {rideData.destination.address}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {rideData.destination.location}
                        </p>
                    </div>

                </div>


                {/* Fare */}
                <div className="flex gap-4 py-4 border-b">

                    <div className="flex justify-center pt-1">
                        <i className="ri-wallet-3-line text-xl text-gray-700"></i>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">
                            {rideData.fare}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {rideData.paymentMethod}
                        </p>
                    </div>

                </div>

                <div className="mt-6 w-full">

                    <form onSubmit={(e) => {
                        submitHandler(e)


                    }}>
                        <input type='text' placeholder="Enter OTP" className="p-3 rounded-md px-7  bg-gray-300 border-2 border-transparent w-full focus:border-yellow-500 focus:outline-none"

                            value={otp}
                            onChange={(e) => setOTP(e.target.value)}


                        />
                    </form>

                    {/* Confirm */}
                    <Link to='/captain-riding'
                        onClick={() => {
                            console.log("Ride accepted");

                            // Example:
                            props.setRidePopup(false);
                            // props.setRideAccepted(true);
                        }}
                        className="
                    flex items-center justify-center
                        w-full
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        font-semibold
                        py-3
                        rounded-lg
                        mt-4
                        cursor-pointer
                        transition
                    "
                    >
                        Confirm
                    </Link>

                    <button
                        onClick={() => {
                            props.setConfirmRidePopUp(false);
                        }}
                        className="
                        w-full
                        border
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        font-semibold
                        py-3
                        rounded-lg
                        mt-2
                        cursor-pointer
                        transition
                    "
                    >
                        Cancel
                    </button>
                </div>

            </div>

        </div>
    );
};

export default ConfirmRidePopUp;