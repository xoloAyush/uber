import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    minHeight: '240px',
};

const defaultPosition = {
    lat: -3.745,
    lng: -38.523,
};

const MapMessage = ({ children }) => (
    <div className="flex h-full min-h-[240px] w-full items-center justify-center bg-gray-100 p-4 text-center text-gray-700">
        {children}
    </div>
);

const LiveTrackingMap = ({ apiKey }) => {
    const [currentPosition, setCurrentPosition] = useState(defaultPosition);
    const [locationError, setLocationError] = useState(() => (
        typeof navigator === 'undefined' || !navigator.geolocation
            ? 'Location tracking is unavailable; showing the default map location.'
            : ''
    ));
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'uber-live-tracking',
        googleMapsApiKey: apiKey,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            return undefined;
        }

        const watchId = navigator.geolocation.watchPosition(
            ({ coords }) => {
                setCurrentPosition({
                    lat: coords.latitude,
                    lng: coords.longitude,
                });
                setLocationError('');
            },
            (error) => {
                console.error('Unable to get the current location:', error);
                setLocationError('Allow location access to show your current position.');
            },
            {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 10000,
            },
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        if (loadError) {
            console.error('Unable to load Google Maps:', loadError);
        }
    }, [loadError]);

    if (loadError) {
        return (
            <MapMessage>
                Google Maps could not load. Check that the Maps JavaScript API is enabled and that your API key and website restrictions are valid.
            </MapMessage>
        );
    }

    if (!isLoaded) {
        return <MapMessage>Loading map…</MapMessage>;
    }

    return (
  <div className="w-full h-full min-h-[280px] relative">
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={15}
    >
      <Marker position={currentPosition} />
    </GoogleMap>

    {locationError && (
      <div className="absolute bottom-3 left-3 z-10 rounded bg-white p-2 text-sm shadow">
        {locationError}
      </div>
    )}
  </div>
);
};

const LiveTracking = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return (
            <MapMessage>
                Google Maps is not configured. Set VITE_GOOGLE_MAPS_API_KEY in the frontend environment and restart the dev server.
            </MapMessage>
        );
    }

    return <LiveTrackingMap apiKey={apiKey} />;
};

export default LiveTracking;
