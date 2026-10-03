import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRidePanel from '../components/ConfirmRidePanel'
import LookingforDriver from "../components/LookingforDriver";
import WaitingforDriver from "../components/WaitingforDriver";
import axios from 'axios'
import SocketContext from "../context/socketContext";
import { useContext } from "react";
import UserContext from "../context/userContext";

const Home = () => {

    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const [activeInput, setActiveInput] = useState(null);

    const [panelOpen, setPanelOpen] = useState(false)
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [confirmRideData, setConfirmRideData] = useState('')

    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)

    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState('')

    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)

    const { sendMessage, receiveMessage } = useContext(SocketContext)
    const { user } = useContext(UserContext)

    console.log(user)

    useEffect(() => {
        sendMessage('join', { userId: user, userType: 'user' })
    }, [user])

    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: "49%",
                opacity: 1,
                display: "block",
                duration: 0.4,
            });

            gsap.to(panelCloseRef.current, {
                opacity: 1,
                duration: 0.3,
            });
        } else {
            gsap.to(panelRef.current, {
                height: "0%",
                opacity: 0,
                display: "none",
                duration: 0.4,
            });

            gsap.to(panelCloseRef.current, {
                opacity: 0,
                duration: 0.3,
            });
        }
    }, [panelOpen]);

    useGSAP(() => {
        if (vehiclePanelOpen) {
            gsap.to(vehiclePanelRef.current, {
                y: "-2%",
                duration: 0.5,
                ease: "power2.out",
            });
        } else {
            gsap.to(vehiclePanelRef.current, {
                y: "100%",
                duration: 0.5,
                ease: "power2.in",
            });
        }
    }, [vehiclePanelOpen]);

    useGSAP(() => {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                y: "0%",
                duration: 0.5,
                ease: "power2.out",
                display: "block"
            });
        } else {
            gsap.to(confirmRidePanelRef.current, {
                y: "80%",
                duration: 0.5,
                display: "none",
                ease: "power2.in",
            });
        }
    }, [confirmRidePanel]);

    useGSAP(() => {
        if (!vehicleFoundRef.current) return;

        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                y: "0%",
                duration: 0.5,
                ease: "power2.out",
                display: "block",
            });
        } else {
            gsap.to(vehicleFoundRef.current, {
                y: "100%",
                duration: 0.5,
                ease: "power2.in",
                display: "none",
            });
        }
    }, [vehicleFound]);

    useGSAP(() => {
        if (!waitingForDriverRef.current) return;

        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                y: "0%",
                duration: 0.5,
                ease: "power2.out",
                display: "block",
            });
        } else {
            gsap.to(waitingForDriverRef.current, {
                y: "100%",
                duration: 0.5,
                ease: "power2.in",
                display: "none",
            });
        }
    }, [waitingForDriver]);

    const getSuggestions = async (input) => {
        if (input.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/maps/get-auto-complete-suggestions`,
                {
                    params: { input },
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            console.log("Suggestions:", response.data);
            setSuggestions(response.data);

        } catch (error) {
            console.error(
                "Autocomplete error:",
                error.response?.data || error.message
            );
            setSuggestions([]);
        }
    };

    async function findTrip(e) {

        e.preventDefault();

        console.log("Form submitted");

        setVehiclePanelOpen(true);
        setPanelOpen(false);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
                {
                    params: { pickup, destination },
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            setFare(response.data.fares)
        } catch (error) {
            console.log(error);
        }

    }

    async function createRide(pickup, destination, vehicleType) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`,
                { pickup, destination, vehicleType },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            setConfirmRideData(response.data.rides)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full h-screen flex md:flex-col relative overflow-y-hidden">

            <div className="h-full w-full">
                <img src="/map01.png" alt="map" className="h-full w-full object-cover" />
            </div>

            <div className="absolute top-0 h-screen rounded-t-xl md:w-[35vw] w-full
            flex flex-col justify-end md:justify-start ">

                <div className="h-[45%] bg-white md:shadow-xl">
                    <form className="p-6 flex flex-col gap-4 rounded-md mt-5 relative " onSubmit={(e) => { submitHandler(e) }}>

                        <h2 className="absolute right-5 opacity-0 text-4xl -top-2" onClick={() => { setPanelOpen(false) }}
                            ref={panelCloseRef}>

                            <i className="ri-arrow-down-wide-line"></i>
                        </h2>

                        <h1 className="font-bold text-3xl">Get a ride</h1>

                        <div className="line w-[0.2rem] rounded-full h-13 absolute left-8 bg-black top-28"></div>

                        <input
                            type="text"
                            placeholder="Pickup location"
                            className="p-3 px-7 rounded-md bg-gray-300 border-2 border-transparent focus:border-yellow-500 focus:outline-none"
                            value={pickup}
                            onChange={(e) => {
                                setPickup(e.target.value);
                                setActiveInput("pickup");
                                setPanelOpen(true);
                                getSuggestions(e.target.value);
                            }}
                            onClick={() => {
                                setActiveInput("pickup");
                                setPanelOpen(true);
                            }}
                        />
                        <input type='text' placeholder="Dropoff location" className="p-3 rounded-md px-7  bg-gray-300 border-2 border-transparent focus:border-yellow-500 focus:outline-none"
                            value={destination}
                            onChange={(e) => {
                                setDestination(e.target.value);
                                setActiveInput("destination");
                                setPanelOpen(true);
                                getSuggestions(e.target.value);
                            }}
                            onClick={() => {
                                setActiveInput("destination");
                                setPanelOpen(true);
                            }}
                        />

                        <button className="bg-black text-white font-bold p-3 rounded-md cursor-pointer hover:bg-gray-900" onClick={(e) => {

                            findTrip(e);
                        }}>Search</button>

                    </form>


                </div>

                <div ref={panelRef} className="md:w-[35vw] md:h-[60vh] h-[0vh] p-6 bg-gray-100 mb-10">
                    <LocationSearchPanel
                        setPanelOpen={setPanelOpen}
                        setVehiclePanelOpen={setVehiclePanelOpen}
                        suggestions={suggestions}
                        setSuggestions={setSuggestions}
                        activeInput={activeInput}
                        pickup={pickup}
                        destination={destination}
                        setPickup={setPickup}
                        setDestination={setDestination}
                    />
                </div>
            </div>

            <div className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 translate-y-100 md:w-[35vw]"
                ref={vehiclePanelRef}
            >

                <VehiclePanel
                    setPanelOpen={setPanelOpen}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    confirmRideData={confirmRideData}
                    setConfirmRideData={setConfirmRideData}
                    fare={fare}
                    setVehicleType={setVehicleType}
                />
            </div>

            <div className="fixed w-full z-20 translate-y-70 bottom-0 bg-white px-3 py-6  md:w-[35vw]" ref={confirmRidePanelRef}
            >

                <ConfirmRidePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} confirmRideData={confirmRideData} setConfirmRideData={setConfirmRideData}
                    pickup={pickup}
                    destination={destination}

                    vehicleFound={vehicleFound}
                    setVehicleFound={setVehicleFound}
                    fare={fare}
                    vehicleType={vehicleType}
                    createRide={createRide}
                />
            </div>

            {/* {vehicleFound &&  */}
            <div
                ref={vehicleFoundRef}
                className="fixed w-full z-20 bg-white px-3 py-6 bottom-0 md:w-[35vw]"
            >
                <LookingforDriver
                    setVehicleFound={setVehicleFound}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    setWaitingForDriver={setWaitingForDriver}

                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    confirmRideData={confirmRideData}
                />
            </div>

            <div
                ref={waitingForDriverRef}
                className="fixed w-full z-20 bg-white px-3 py-6 bottom-0 md:w-[35vw]"
            >
                <WaitingforDriver
                    setVehicleFound={setVehicleFound}

                    setVehiclePanelOpen={setVehiclePanelOpen}
                    setWaitingForDriver={setWaitingForDriver}


                />
            </div>

        </div>
    )
}

export default Home