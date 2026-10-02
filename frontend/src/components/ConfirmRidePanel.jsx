import React from "react";

const ConfirmRidePanel = (props) => {
    const vehicleData = props.confirmRideData;

    if (!vehicleData) {
        return null;
    }

    console.log("Confirm Ride Data:", vehicleData);
    console.log(props.setVehicleFound);

    console.log("image", vehicleData.image)

    return (
        <div className="w-full bg-white px-2 pb-2">

            {/* Header */}
            <div className="relative flex items-center justify-center mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                    Confirm your Ride
                </h2>

                <button
                    onClick={() => {
                        props.setConfirmRidePanel(false)
                    }}
                    className="absolute right-0 top-0 text-2xl text-gray-400 hover:text-black cursor-pointer"
                >
                    <i className="ri-close-line"></i>
                </button>
            </div>

            {/* Vehicle Image */}
            <div className="w-full flex justify-center items-center h-28">
                <img
                    src={vehicleData.image}
                    alt={vehicleData.name}
                    className="w-40 h-24 object-contain"
                />
            </div>

            {/* Pickup */}
            <div className="flex items-center gap-4 py-3 border-b border-gray-200">

                <div className="flex items-center justify-center w-7 h-7 mt-1">
                    <i className="ri-map-pin-line text-lg text-gray-900"></i>
                </div>

                <div className="flex-1 ">

                    <h3 className="text-lg text-gray-900 leading-4">
                        {props.pickup}
                    </h3>
                </div>

            </div>

            {/* Destination */}
            <div className="flex items-center gap-4 py-3 border-b border-gray-200">

                <div className="flex items-center justify-center w-7 h-7 mt-1">
                    <i className="ri-map-pin-2-fill text-lg text-black"></i>
                </div>

                <div className="flex-1">

                    <h3 className="text-lg text-gray-900 leading-4">
                        {props.destination}
                    </h3>
                </div>

            </div>

            {/* Fare */}
            <div className="flex items-center gap-4 py-3 mb-5">

                <div className="flex items-center justify-center w-7 h-7">
                    <i className="ri-wallet-3-line text-lg text-gray-900"></i>
                </div>

                <div>
                    <h3 className="font-bold text-lg text-gray-900">
                        ₹{props.fare?.[props.vehicleType] ?? "--"}
                    </h3>

                </div>

            </div>

            {/* Confirm Button */}
            <button
                onClick={async () => {
                    console.log("Creating ride...");

                    await props.createRide(
                        props.pickup,
                        props.destination,
                        props.vehicleType
                    );

                    props.setConfirmRidePanel(false);
                    props.setVehicleFound(true);
                }}
                className="w-full bg-green-600 hover:bg-green-700
               text-white font-semibold
               py-2.5 rounded-md
               cursor-pointer transition-colors"
            >
                Confirm
            </button>

        </div>
    );
};

export default ConfirmRidePanel;