import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {

    const navigate = useNavigate();

    const ride = props.ride; 
    console.log(ride)

    const finishRide = async () => {
  try {
    if (!ride?._id) {
      console.error("Ride data is missing");
      return;
    }

    const token = localStorage.getItem("token");

    console.log("========== FINISH RIDE ==========");
    console.log("Ride ID:", ride._id);
    console.log("Ride status:", ride.status);
    console.log("Token exists:", !!token);

    if (!token) {
      console.error("Captain token not found. Please log in again.");
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }, // config
      }
    );

    console.log("✅ END RIDE RESPONSE:", response.data);

    if (response.status === 200) {
      props.setFinishRide(false);
      navigate("/captain-home");
    }
  } catch (error) {
    console.error(
      "❌ END RIDE ERROR:",
      error.response?.data || error.message
    );
  }
};


    return (
        <div className="w-full pb-4 rounded-md border border-gray-200">

            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">

                <h2 className="text-2xl font-bold">
                    Finish this Ride!
                </h2>

                <button
                    type="button"
                    onClick={() => props.setFinishRide(false)}
                    className="text-gray-400 hover:text-black text-2xl cursor-pointer"
                >
                    <i className="ri-close-line"></i>
                </button>

            </div>


            {/* Rider Information */}
            <div className="mx-3 mt-5 bg-gray-200 flex items-center justify-between rounded-md px-2 py-2">

                {/* Rider */}
                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">

                        <img
                            src={
                                ride?.user?.avatar ||
                                "https://via.placeholder.com/150"
                            }
                            alt="Rider"
                            className="w-full h-full object-cover"
                        />

                    </div>

                    <h3 className="font-semibold">
                        {ride?.user?.fullname?.firstname}{" "}
                        {ride?.user?.fullname?.lastname}
                    </h3>

                </div>


                {/* Vehicle */}
                <p className="font-bold">
                    {ride?.vehicleType?.toUpperCase()}
                </p>

            </div>


            {/* Ride Details */}
            <div className="px-4">

                {/* Pickup */}
                <div className="flex gap-4 py-4 border-b">

                    <div className="flex justify-center pt-1">
                        <i className="ri-map-pin-user-fill text-xl text-gray-700"></i>
                    </div>

                    <div className="min-w-0 flex-1">

                        <h3 className="font-semibold text-lg">
                            Pickup
                        </h3>

                        <p
                            className="text-sm text-gray-500 break-words"
                            title={ride?.pickup || ""}
                        >
                            {ride?.pickup
                                ? ride.pickup.length > 60
                                    ? `${ride.pickup.slice(0, 60)}...`
                                    : ride.pickup
                                : "Pickup location unavailable"
                            }
                        </p>

                    </div>

                </div>


                {/* Destination */}
                <div className="flex gap-4 py-4 border-b">

                    <div className="flex justify-center pt-1">
                        <i className="ri-map-pin-fill text-xl text-black"></i>
                    </div>

                    <div className="min-w-0 flex-1">

                        <h3 className="font-semibold text-lg">
                            Destination
                        </h3>

                        <p
                            className="text-sm text-gray-500 break-words"
                            title={ride?.destination || ""}
                        >
                            {ride?.destination
                                ? ride.destination.length > 60
                                    ? `${ride.destination.slice(0, 60)}...`
                                    : ride.destination
                                : "Destination unavailable"
                            }
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
                            ₹{ride?.fare}
                        </h3>

                        <p className="text-sm text-gray-500">
                            Cash
                        </p>

                    </div>

                </div>


                {/* Finish Ride */}
                <button
                    type="button"
                    onClick={finishRide}
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
                    Finish Ride
                </button>

                <p className="text-center mt-5 text-xs text-red-500">
                    Click on finish ride button if you have completed the payment
                </p>

            </div>

        </div>
    );
};

export default FinishRide;