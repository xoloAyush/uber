
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup';
import { useRef, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useContext } from "react";
import SocketContext from '../context/socketContext'
import CaptainContext from '../context/captainContext'
import { useEffect } from "react"
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';

const CaptainHome = () => {

    const vehicleData = {
        id: 1,
        name: "Vehicle type",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCOeEInGLbQIQ3RimySDEiVr6eLHsEciqYPVv6KcRMYv9Q_SG",
        price: "₹250",
        passengers: 4,
        time: "5 mins",
    };

    const driverData = {
        name: "Aryan Saini",
        image: "/driver.jfif",
        rating: 4.9,
        plate_number: "DL 1C AB 1234",
        model_name: "Maruti Suzuki Baleno",
    }

    const [ridePopup, setRidePopup] = useState(true);
    const [confirmRidePopUp, setConfirmRidePopUp] = useState(false)

    const ridePopupRef = useRef(null)
    const confirmRidePopUpRef = useRef(null)
    const [ride, setRide] = useState(null)

    useGSAP(() => {
        if (ridePopup) {
            gsap.to(ridePopupRef.current, {
                y: '0%',
                duration: 0.5,
                ease: "power2.out",
                // opacity: 0
            })
        }
        else {
            gsap.to(ridePopupRef.current, {
                y: '100%',
                duration: 0.5,
                ease: "power2.out",
                // opacity: 0
            })
        }
    }, [ridePopup])


    useGSAP(() => {
        if (confirmRidePopUp) {
            gsap.to(confirmRidePopUpRef.current, {
                y: '0%',
                duration: 0.5,
                ease: "power2.out",
                // opacity: 0
            })
        }
        else {
            gsap.to(confirmRidePopUpRef.current, {
                y: '100%',
                duration: 0.5,
                ease: "power2.out",
                // opacity: 0
            })
        }
    }, [confirmRidePopUp])

    const { sendMessage, receiveMessage } = useContext(SocketContext)
    const { captain } = useContext(CaptainContext)
    const { socket } = useContext(SocketContext)

    console.log(captain)

   useEffect(() => {
    if (!captain) return;

    console.log("Captain joining socket:", captain);

    sendMessage("join", {
        userId: captain,
        userType: "captain"
    });

    const updateLocation = () => {

        if (!navigator.geolocation) {
            console.log("Geolocation is not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                console.log("Captain location:", {
                    userId: captain,
                    lat,
                    lng
                });

                sendMessage("update-location-captain", {
                    userId: captain,
                    location: {
                        ltd: lat,
                        lng: lng
                    }
                });
            },
            (error) => {
                console.error(
                    "Geolocation error:",
                    error.message
                );
            }
        );
    };

    updateLocation();

    const locationInterval = setInterval(
        updateLocation,
        10000
    );

    return () => {
        clearInterval(locationInterval);
    };

}, [captain]);

    useEffect(() => {

    receiveMessage("new-ride", (data) => {

        console.log("🔥 NEW RIDE RECEIVED:", data);

        setRide(data);
        setRidePopup(true);

    });

}, []);

    async function confirmRide() {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
            {
                rideId: ride._id,
                captain: captain
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        console.log("🔥 CONFIRMED RIDE:", response.data);

        // Replace old pending ride with confirmed ride
        setRide(response.data);

        // Close request popup
        setRidePopup(false);

        // Open OTP popup
        setConfirmRidePopUp(true);

    } catch (error) {
        console.error(
            "❌ Confirm ride error:",
            error.response?.data || error
        );
    }
}

    return (
        <div className='riding w-full h-screen flex flex-col md:flex-row-reverse relative overflow-y-auto'>
            <div className='w-full  h-1/2 md:h-screen'>
                <LiveTracking />

            </div>

            <div className='absolute  flex w-full h-50px justify-between items-center text-center p-4 md:justify-start'>
                <img className='w-10 h-10 ' src='https://tb-static.uber.com/prod/udam-assets/e24f1914-1e23-4896-ad77-22e88c37c2f9.svg' alt="" />

                <Link
                    to="/home"
                    className=" w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:text-black border md:ml-[25%]"
                >
                    <i className="ri-logout-box-r-line text-[20px]"></i>
                </Link>
            </div>
            <div className="md:w-[50%] w-full">

                <div className="w-full  p-4 md:mt-20">

                    <CaptainDetails />
                </div>

                <div
                    className="
        fixed
        bottom-0
        left-0
        w-full
        
        md:w-[33%]
        max-h-[80vh]
        overflow-y-auto
        bg-gray-100
        rounded-t-2xl
        md:rounded-2xl
        p-4 
        z-20  
       
    "
                    ref={ridePopupRef}
                >
                    {ride && (
    <RidePopup
        ride={ride}
        setRidePopup={setRidePopup}
        setConfirmRidePopUp={setConfirmRidePopUp}

        confirmRide={confirmRide}
    />
)}
                </div>

                <div
                    className="
        fixed
        bottom-0
        left-0
        w-full
        
        md:w-[33%]
        
        overflow-y-auto
        bg-gray-100
        rounded-t-2xl
        md:rounded-2xl
        p-4 
        z-20  h-screen
        
       
    "
                    ref={confirmRidePopUpRef}
                >
                    <ConfirmRidePopUp 
                    ride={ride}
                    confirmRidePopUp={confirmRidePopUp} setConfirmRidePopUp={setConfirmRidePopUp}
                        setRidePopup={setRidePopup} 
                    />
                </div>
            </div>
        </div >
    )
}

export default CaptainHome