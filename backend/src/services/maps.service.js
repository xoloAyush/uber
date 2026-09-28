import axios from "axios";

export const getAddressCoordinate = async (address) => {
    if (!address) {
        throw new Error("Address is required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    if (!apiKey) {
        throw new Error("GOOGLE_MAPS_API is not defined");
    }

    const url = "https://maps.googleapis.com/maps/api/geocode/json";

    try {
        const response = await axios.get(url, {
            params: {
                address,
                key: apiKey
            }
        });

        console.log("Google Maps response:", response.data);

        if (response.data.status !== "OK") {
            throw new Error(
                `Google Geocoding API error: ${response.data.status} ${response.data.error_message || ""
                }`
            );
        }

        const location = response.data.results[0].geometry.location;

        return {
            latitude: location.lat,
            longitude: location.lng
        };

    } catch (error) {
        console.error(
            "Geocoding error:",
            error.response?.data || error.message
        );

        throw error;
    }
};


export const getDistance = async (origin, destination) => {

    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    if (!apiKey) {
        throw new Error("GOOGLE_MAPS_API is not defined");
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status !== "OK") {
            throw new Error(`Google Maps API error: ${response.data.status}`);
        }

        if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
            throw new Error('No routes found');
        }


        return response.data.rows[0].elements[0];
    } catch (error) {
        console.error("Error in getDistance:", error);
        throw error;
    }

}

export const getAutoCompleteSuggestion = async (input) => {
    if (!input) {
        throw new Error("Input is required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    if (!apiKey) {
        throw new Error("GOOGLE_MAPS_API is not defined");
    }

    const url =
        "https://maps.googleapis.com/maps/api/place/autocomplete/json";

    try {
        const response = await axios.get(url, {
            params: {
                input: input,
                key: apiKey
            }
        });

        console.log("Places response:", response.data);

        if (response.data.status === "OK") {
            return response.data.predictions;
        }

        throw new Error(
            `Google Places API error: ${response.data.status} ${response.data.error_message || ""
            }`
        );

    } catch (error) {
        console.error(
            "Autocomplete error:",
            error.response?.data || error.message
        );

        throw error;
    }
};