import React from "react";
import { vehicles } from "../data/vehicles";


const WaitingforDriver = (props) => {

    const vehicleData = {
        id: 1,
        name: "Vehicle type",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCOeEInGLbQIQ3RimySDEiVr6eLHsEciqYPVv6KcRMYv9Q_SG",
        price: "₹250",
        passengers: 4,
        time: "5 mins",
    };

    const driverData = {
        name: "Saini",
        image: "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.9,
        plate_number: "DL 1C AB 1234",
        model_name: "Maruti Suzuki Baleno",
    }

    const handleVehicleClick = (e) => {
        const vehicle = e.target.closest("[data-vehicle-id]");

        if (!vehicle) return;
        // console.log(vehicle)
        // console.log(vehicle.dataset)

        const vehicleId = Number(vehicle.dataset.vehicleId);

        const selectedVehicle = vehicles.find(
            (vehicle) => vehicle.id === vehicleId
        );

    };

    return (

        <div className="w-full">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">
                    Waiting for Driver
                </h2>

                <button
                    onClick={() => {
                        props.setWaitingForDriver(false)
                        // props.setVehicleFound(true)
                    }}
                    className="text-3xl text-gray-500 hover:text-black cursor-pointer"
                >
                    <i className="ri-arrow-down-wide-fill"></i>
                </button>
            </div>

            {/* Vehicle Information */}
            <div className="flex flex-col gap-4 bg-gray-100 p-4">

                {/* Vehicle Image */}
                <div className="w-full flex items-center justify-between px-4 py-3">
                    {/* Driver */}
                    <div className="w-19 h-19 overflow-hidden rounded-full flex-shrink-0">
                        <img
                            src={driverData.image}
                            alt={driverData.name}
                            className="w-full h-full object-cover"
                        />
                    </div>


                    {/* Vehicle Details */}
                    <div className="flex flex-col items-end justify-center">
                        <h3 className="text-xl font-medium">
                            {driverData.name}
                        </h3>

                        <h3 className="text-2xl font-bold">
                            {driverData.plate_number}
                        </h3>

                        <p className="text-sm ">
                            {driverData.model_name}
                        </p>

                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-medium">4.9</span>
                        </div>
                    </div>
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

            {/* <button
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
            </button> */}

        </div>
    )
};

export default WaitingforDriver;