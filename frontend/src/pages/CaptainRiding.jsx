
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import FinishRide from "./FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const location = useLocation();
  const ride = location.state?.ride;

  const [finishRide, setFinishRide] = useState(false);
  const finishRideRef = useRef(null);

  useGSAP(() => {
    if (!finishRideRef.current) return;

    gsap.to(finishRideRef.current, {
      y: finishRide ? "0%" : "100%",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [finishRide]);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden md:flex-row-reverse">

      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between p-6 pointer-events-none">
        <img
          className="h-10 w-10"
          src="https://tb-static.uber.com/prod/udam-assets/e24f1914-1e23-4896-ad77-22e88c37c2f9.svg"
          alt="Uber"
        />

        <Link
          to="/captain-home"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"
          aria-label="Return to captain home"
        >
          <i className="ri-logout-box-r-line text-lg font-medium" />
        </Link>
      </header>

      {/* Map — RIGHT */}
      <main className="relative h-[65vh] min-h-0 w-full md:h-full md:flex-1">
        <LiveTracking />
      </main>

      {/* Ride controls — LEFT */}
      <section className="relative z-10 flex min-h-0 flex-1 flex-col justify-center gap-5 overflow-y-auto rounded-t-2xl bg-yellow-400 p-6 md:h-full md:w-[380px] md:flex-none md:rounded-none md:bg-gray-200">

        <h4 className="text-xl font-semibold">
          4 KM away
        </h4>

        <button
          onClick={() => setFinishRide(true)}
          className="cursor-pointer rounded-lg bg-green-600 px-10 py-3 font-semibold text-white"
        >
          Complete Ride
        </button>

        {/* Finish ride panel — LEFT */}
        <div
          ref={finishRideRef}
          className="fixed bottom-0 left-0 z-40 max-h-[80vh] w-full translate-y-full overflow-y-auto rounded-t-2xl bg-gray-100 p-4 shadow-xl md:right-auto md:w-[380px] md:rounded-t-2xl"
        >
          <FinishRide
            ride={ride}
            finishRide={finishRide}
            setFinishRide={setFinishRide}
          />
        </div>
      </section>
    </div>
  );
};

export default CaptainRiding;
