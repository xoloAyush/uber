import React from 'react'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FinishRide from './FinishRide';

const CaptainRiding = () => {

    const [finishRide, SetfinishRide] = useState(false);
    const finishRideRef = useRef(null);

    useGSAP(() => {
        if (finishRide) {
            gsap.to(finishRideRef.current, {
                y: '0%',
                duration: 0.5,
                ease: "power2.out",
                // opacity: 0
            })
        }
        else {
            gsap.to(finishRideRef.current, {
                y: '100%',
                duration: 0.5,
                ease: "power2.out",
                // opacity: 0
            })
        }
    }, [finishRide])

    return (
        <div className='h-screen relative md:flex flex-row-reverse'>

            {/* Header */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>

                <img className='w-10 h-10 ' src='https://tb-static.uber.com/prod/udam-assets/e24f1914-1e23-4896-ad77-22e88c37c2f9.svg' alt="" />

                <Link
                    to='/captain-home'
                    className='h-10 w-10 bg-white flex items-center justify-center rounded-full'
                >
                    <i className='text-lg font-medium ri-logout-box-r-line'></i>
                </Link>

            </div>


            {/* Map */}
            <div className='h-4/5  md:h-full'>

                <img
                    className='h-full w-full object-cover'
                    src='map01.png'
                    alt="map"
                />

            </div>


            {/* Bottom Section */}
            <div className='h-1/5 md:w-[54%] md:h-full md:flex-col p-6 flex items-center justify-between md:justify-center relative md:bg-gray-200 bg-yellow-400 pt-10'>

                <h5
                    className='p-1 text-center w-[90%] absolute top-0'
                    onClick={() => {
                    }}
                >
                    <i className='text-3xl text-gray-800 ri-arrow-up-wide-line'></i>
                </h5>

                <h4 className='text-xl font-semibold mb-5'>
                    4 KM away
                </h4>

                <button onClick={() => SetfinishRide(true)} className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg cursor-pointer'>
                    Complete Ride
                </button>

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
        z-20 
       
    "
                    ref={finishRideRef}
                >
                    <FinishRide finishRide={finishRide} setFinishRide={SetfinishRide} />
                </div>

            </div>

        </div>
    )
}

export default CaptainRiding