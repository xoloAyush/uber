const LocationSearchPanel = (props) => {

    console.log(props)

    const locations = [
        "Connaught Place, New Delhi",
        "India Gate, New Delhi",
        "Rajiv Chowk Metro Station, New Delhi",
        "Saket, New Delhi",
        "Hauz Khas Village, New Delhi",
        "Lajpat Nagar Central Market, New Delhi",
        "Karol Bagh, New Delhi",
        "Greater Kailash, New Delhi",
        "Noida Sector 18, Noida",
        "Botanical Garden Metro Station, Noida"
    ];

    const handleLocationClick = (location) => {
        console.log("Selected location:", location);

        props.setLocation(location);

        props.setPanelOpen(false);
        props.setVehiclePanelOpen(true);
    }

    return (
        <div className="h-full overflow-y-auto ">


            {locations.map((items, index) => {
                return (
                    <div key={index} className="flex gap-4 items-center border-b border-gray-200
                justify-start hover:bg-gray-300 px-2 py-4 rounded-md "

                        onClick={() => handleLocationClick(items)}>

                        <h2 className="bg-[#eee] flex items-center justify-center
                    w-12 h-12 p-4 rounded-full shrink-0">
                            <i className="ri-map-pin-line"></i>
                        </h2>

                        <h4 className="font-medium">
                            {items}
                        </h4>
                    </div>
                )
            })}

            {/* <div className="flex gap-4 items-center border-b border-gray-200
                justify-start hover:bg-gray-300 px-2 py-4 rounded-md">
                
                <h2 className="bg-[#eee] flex items-center justify-center
                    w-12 h-12 p-4 rounded-full shrink-0">
                    <i className="ri-map-pin-line"></i>
                </h2>

                <h4 className="font-medium">
                    24B, Near Kapoor's cafe, Sheriyans Coding
                </h4>
            </div> */}

        </div>
    );
};

export default LocationSearchPanel