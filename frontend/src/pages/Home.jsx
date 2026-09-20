import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {

    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)

    const panelRef = useRef(null)
     const panelCloseRef = useRef(null)
   

    const submitHandler = (e) => {
       e.preventDefault();

    console.log("Form submitted");
    }

    console.log(panelOpen)

    useGSAP(() => {
        if(panelOpen){

             gsap.to(panelRef.current, {
            height: '55%',
        });

        gsap.to(panelCloseRef.current, {
            opacity: 1,
        });

        }
        else{
             gsap.to(panelRef.current, {
            height: '0%',
        })

        gsap.to(panelCloseRef.current, {
            opacity: 0,
        });
    }
       
    },[panelOpen]);

    return (
        <div className="w-full h-screen flex md:flex-col relative">

            <div className="h-full w-full">
                <img src="/map01.png" alt="map" className="h-full w-full object-cover"/>
            </div>

            <div className="absolute top-0 h-screen rounded-t-xl md:w-[35vw] w-full
            flex flex-col justify-end md:justify-start">

                <div className="h-[45%] bg-white">
                    <form className="p-6 flex flex-col gap-4 rounded-md mt-5 relative " onSubmit={(e)=>{submitHandler(e)}}>

                        <h2 className="absolute right-5 opacity-0 text-4xl -top-2" onClick={()=>{setPanelOpen(false)}} 
                            ref={panelCloseRef}>
                                
                            <i class="ri-arrow-down-wide-line"></i>
                        </h2>

                    <h1 className="font-bold text-3xl">Get a ride</h1>

                    <div className="line w-[0.2rem] rounded-full h-13 absolute left-8 bg-black top-28"></div>

                    <input
  type="text"
  placeholder="Pickup location"
  className="p-3 px-7 rounded-md bg-gray-300 border-2 border-transparent focus:border-yellow-500 focus:outline-none"
  value={pickup}
  onChange={(e)=>{e.target.value}}
  onClick={()=>{setPanelOpen(true)}}
/>
                    <input type='text' placeholder="Dropoff location" className="p-3 rounded-md px-7  bg-gray-300 border-2 border-transparent focus:border-yellow-500 focus:outline-none" 
                    value={destination}
                    onChange={(e)=>{e.target.value}}
                    onClick={()=>{setPanelOpen(true)}}
                    />

                    <button className="bg-black text-white font-bold p-3 rounded-md cursor-pointer hover:bg-gray-900">Search</button>

                </form>

                
                </div>

                <div ref={panelRef} className=" md:h-[60vh] h-[0vh] p-6 bg-white">
                    <LocationSearchPanel/>
                </div>
            </div>
        </div>
    )
}

export default Home