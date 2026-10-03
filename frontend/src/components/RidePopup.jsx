import React from "react";

const RidePopup = ({
    ride,
    setRidePopup,
    setConfirmRidePopUp
}) => {

    // Don't render anything if ride data hasn't arrived
    if (!ride) {
        return null;
    }

    console.log(
        "Rider:",
        ride.user?.fullname?.firstname,
        ride.user?.fullname?.lastName
    );

    return (
        <div className="w-full pb-4 rounded-md border border-gray-200">

            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">

                <h2 className="text-2xl font-bold">
                    New Ride Available!
                </h2>

                <button
                    onClick={() => setRidePopup(false)}
                    className="text-gray-400 hover:text-black text-2xl cursor-pointer"
                >
                    <i className="ri-close-line"></i>
                </button>

            </div>


            {/* Rider Information */}
            <div className="mx-3 bg-gray-200 flex items-center justify-between rounded-md px-2 py-2">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">

                        <img
                            src={
                                ride.user?.profileImage ||
                                "/default-avatar.png"
                            }
                            alt="Rider"
                            className="w-full h-full object-cover"
                        />

                    </div>

                    <h3 className="font-semibold">
                        {ride.user?.fullname?.firstname + " " +
                        ride.user?.fullname?.lastname}
                    </h3>

                </div>

            </div>


            {/* Ride Details */}
            <div className="px-4">

                {/* Pickup */}
                <div className="flex gap-4 py-4 border-b">

                    <div className="flex justify-center pt-1">
                        <i className="ri-map-pin-user-fill text-xl text-gray-700"></i>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">
                            {ride.pickup || "Pickup Location"}
                        </h3>
                    </div>

                </div>


                {/* Destination */}
                <div className="flex gap-4 py-4 border-b">

                    <div className="flex justify-center pt-1">
                        <i className="ri-map-pin-fill text-xl text-black"></i>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">
                            {ride.destination || "Destination"}
                        </h3>
                    </div>

                </div>


                {/* Fare */}
                <div className="flex gap-4 py-4 border-b">

                    <div className="flex justify-center pt-1">
                        <i className="ri-wallet-3-line text-xl text-gray-700"></i>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">
                            ₹ {ride.fare ?? 0}
                        </h3>
                    </div>

                </div>


                {/* Accept */}
                <button
                    onClick={() => {
                        console.log("Ride accepted", ride);

                        setRidePopup(false);
                        setConfirmRidePopUp(true);
                    }}
                    className="
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
                    Accept
                </button>


                {/* Ignore */}
                <button
                    onClick={() => {
                        console.log("Ride ignored");

                        setRidePopup(false);
                    }}
                    className="
                        w-full
                        bg-gray-300
                        hover:bg-gray-400
                        text-gray-800
                        font-semibold
                        py-3
                        rounded-lg
                        mt-2
                        cursor-pointer
                        transition
                    "
                >
                    Ignore
                </button>

            </div>

        </div>
    );
};

export default RidePopup;