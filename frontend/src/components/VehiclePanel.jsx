import React from 'react'
import { vehicles } from "../data/vehicles";


const VehiclePanel = (props) => {

    const handleVehicleClick = (e) => {
        const vehicle = e.target.closest("[data-vehicle-id]");

        if (!vehicle) return;
        // console.log(vehicle)
        // console.log(vehicle.dataset)

        const vehicleId = Number(vehicle.dataset.vehicleId);

        const selectedVehicle = vehicles.find(
            (vehicle) => vehicle.id === vehicleId
        );

        // props.setVehiclePanelOpen(false);
        props.setConfirmRidePanel(true);

        props.setConfirmRideData(selectedVehicle);

        console.log("Selected vehicle:", selectedVehicle);
    };

    return (

        <div>

            <h3 className="text-2xl font-semibold mb-5 ">
                Choose a Vehicle
            </h3>

            <h2 className="absolute text-4xl top-2 right-7"
                onClick={() => {
                    props.setPanelOpen(true)
                    props.setVehiclePanelOpen(false)
                }}>
                <i className="ri-arrow-down-wide-fill"></i></h2>

            <div
                className="flex flex-col gap-4"
                onClick={handleVehicleClick}
            >
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle.id}
                        data-vehicle-id={vehicle.id}
                        className="flex border-2  active:border-black border-gray-300 rounded-xl
                       w-full p-3 items-center cursor-pointer
                       hover:bg-gray-100"
                    >
                        <img
                            className="h-12"
                            src={vehicle.image}
                            alt={vehicle.name}
                        />

                        <div className="w-1/2 ml-10">
                            <h4 className="font-medium text-base">
                                {vehicle.name}{" "}
                                <span>
                                    <i className="ri-user-3-fill"></i>{" "}
                                    {vehicle.passengers}
                                </span>
                            </h4>

                            <h5 className="font-medium text-sm">
                                {vehicle.time}
                            </h5>

                            <p className="font-normal text-xs text-gray-600">
                                {vehicle.description}
                            </p>
                        </div>

                        <h2 className="text-xl font-semibold">
                            {vehicle.price}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VehiclePanel