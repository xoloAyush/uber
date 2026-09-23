
import React from "react";

const ConfirmRidePanel = (props) => {
    const vehicleData = props.confirmRideData;

    if (!vehicleData) {
        return null;
    }

    console.log("Confirm Ride Data:", props.confirmRidePanel)

    console.log(props.setVehicleFound)

    return (
        <div className="w-full">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">
                    Confirm Your Ride
                </h2>

                <button
                    onClick={() => {
                        props.setConfirmRidePanel(false),
                            props.setVehicleFound(true)
                    }}
                    className="text-3xl text-gray-500 hover:text-black cursor-pointer"
                >
                    <i className="ri-close-line"></i>
                </button>
            </div>

            {/* Vehicle Information */}
            <div className="flex flex-col gap-4 bg-gray-100 rounded-xl p-4">

                {/* Vehicle Image */}
                <div className="w-full  flex justify-center">
                    <img
                        src={vehicleData.image}
                        alt={vehicleData.name}
                        className="w-28 h-20 object-contain"
                    />
                </div>


                {/* Vehicle Details */}
                <div className="flex-1">

                    <div className="flex items-center justify-between ">
                        <h3 className="text-xl font-semibold">
                            {vehicleData.name}

                        </h3>

                        <h3 className="text-xl font-bold">
                            {vehicleData.price}
                        </h3>
                    </div>

                    <p className="text-sm text-gray-600 mt-1">
                        <i className="ri-user-3-fill"></i>{" "}
                        {vehicleData.passengers} passengers
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                        <i className="ri-time-line"></i> {vehicleData.time}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                        <i class="ri-map-pin-line"></i> {props.location}
                    </p>
                </div>
            </div>

            {/* Ride Details
            <div className="mt-5">

                <div className="flex items-center gap-4 border-b py-3">
                    <i className="ri-map-pin-user-fill text-xl"></i>

                    <div>
                        <p className="text-xs text-gray-500">
                            Pickup
                        </p>
                        <p className="font-medium">
                            Your pickup location
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 border-b py-3">
                    <i className="ri-map-pin-2-fill text-xl"></i>

                    <div>
                        <p className="text-xs text-gray-500">
                            Destination
                        </p>
                        <p className="font-medium">
                            Your destination
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 py-3">
                    <i className="ri-wallet-3-fill text-xl"></i>

                    <div>
                        <p className="text-xs text-gray-500">
                            Payment
                        </p>
                        <p className="font-medium">
                            Cash
                        </p>
                    </div>
                </div>

            </div> */}

            {/* Confirm Button */}
            <button
                onClick={() => {
                    console.log("Ride confirmed:", vehicleData);

                    // Close confirm panel
                    props.setConfirmRidePanel(false);
                    props.setVehicleFound(true);
                }}
                className="w-full bg-green-600 hover:bg-green-700
                           text-white font-bold py-3 rounded-xl
                           mt-4 cursor-pointer transition"
            >
                Confirm Ride
            </button>

        </div>
    );
};

export default ConfirmRidePanel;
