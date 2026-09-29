const LocationSearchPanel = (props) => {

    const handleLocationClick = (location) => {

        console.log("Selected location:", location);

        if (props.activeInput === "pickup") {
            props.setPickup(location);
        }

        if (props.activeInput === "destination") {
            props.setDestination(location);
        }

        props.setSuggestions([]);

    };

    const handleSearchClick = () => {
        props.setVehiclePanelOpen(true);
        props.setPanelOpen(false);
    };

    return (
        <div className="h-full overflow-y-auto">

            {Array.isArray(props.suggestions) && props.suggestions.map((item, index) => {

                const location = item.description;

                return (
                    <div
                        key={item.place_id || index}
                        className="flex gap-4 items-center border-b border-gray-200
                        justify-start hover:bg-gray-300 px-2 py-4 rounded-md"
                        onClick={() => handleLocationClick(location)}
                    >

                        <h2 className="bg-[#eee] flex items-center justify-center
                            w-12 h-12 p-4 rounded-full shrink-0">

                            <i className="ri-map-pin-line"></i>

                        </h2>

                        <h4 className="font-medium">
                            {location}
                        </h4>

                    </div>
                );
            })}

        </div>
    );
};

export default LocationSearchPanel;