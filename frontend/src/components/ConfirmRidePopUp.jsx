import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

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

    const [ otp, setOtp ] = useState('')
    const navigate = useNavigate()

    const submitHandler = async(e) => {
        e.preventDefault();

        console.log("========== START RIDE ==========");
console.log("Requested rideId:", props.ride);
console.log("Requested OTP:", otp);
console.log("Database rideId:", props.ride._id.toString());
console.log("Database status:", props.ride.status);
console.log("Database OTP:", props.ride.otp);
console.log("================================");

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setRidePopup(false)
            props.setConfirmRidePopUp(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }
    }

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
                        {props.ride?.user?.fullname?.firstname + " " + props.ride?.user?.fullname?.lastname}
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
            title={props.ride?.pickup || ""}
        >
            {props.ride?.pickup
                ? props.ride.pickup.length > 45
                    ? `${props.ride.pickup.slice(0, 45)}...`
                    : props.ride.pickup
                : "Pickup location unavailable"}
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
            title={props.ride?.destination || ""}
        >
            {props.ride?.destination
                ? props.ride.destination.length > 45
                    ? `${props.ride.destination.slice(0, 45)}...`
                    : props.ride.destination
                : "Destination unavailable"}
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

                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />

                        <button className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)

                        }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>

                    </form>
                </div>

            </div>

        </div>
    );
};

export default ConfirmRidePopUp;