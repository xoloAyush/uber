
import React from 'react'

const CaptainDetails = () => {

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

    return (
        <div className="flex flex-col gap-4 md:gap-6  p-2">

            {/* Vehicle Image */}
            <div className="w-full flex items-center justify-between px-4 py-3">
                {/* Driver */}

                <div className='flex justify-center items-center gap-2'>
                    <div className="w-19 h-19 overflow-hidden rounded-full flex-shrink-0 border border-gray-300">
                        <img
                            src={driverData.image}
                            alt={driverData.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <h3 className="text-xl font-medium">
                            {driverData.name}
                        </h3>

                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-medium">4.9</span>
                        </div>

                    </div>

                </div>

                <div>
                    <p className='font-bold'>₹250</p>
                    <p className='text-gray-600'>Earned</p>
                </div>

            </div>

            {/* Vehicle Details */}
            <div className="flex justify-between  items-center bg-gray-100 p-4 rounded-md">


                <div className="text-center">
                    <i className="ri-timer-2-line text-3xl mb-2"></i>
                    <h5 className='text-lg font-medium'>10</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>

                <div className="text-center">
                    <i className="ri-map-pin-range-line text-3xl mb-2"></i>
                    <h5 className='text-lg font-medium'>4</h5>
                    <p className='text-sm text-gray-600'>Trips</p>
                </div>

                <div className="text-center">
                    <i className="ri-chat-2-line text-3xl mb-2"></i>
                    <h5 className='text-lg font-medium'>100</h5>
                    <p className='text-sm text-gray-600'>Today's Earning</p>
                </div>
            </div>
        </div>

    )
}

export default CaptainDetails