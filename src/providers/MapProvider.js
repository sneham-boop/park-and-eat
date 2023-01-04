import React, { useState, useEffect, createContext } from "react";
import GoogleMapReact from "google-map-react";
import useLocalStorage from "../hooks/useLocalStorage";

export const mapContext = createContext();

export default function MapProvider(props) {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const defaultLocation = { lat: 43.6532, lng: -79.3832 };
  const [location, setLocation] = useState(
    getLocalStorage("location") || defaultLocation
  );
  const [mapAPILoaded, setMapAPILoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [mapAPI, setMapAPI] = useState(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
      setLocalStorage("location", { lat: latitude, lng: longitude });
    });
  };
  useEffect(() => {
    getCurrentLocation();
    return function cleanup() {
      getCurrentLocation();
    };
  }, [setLocalStorage]);

  const handleApiLoaded = (map, maps) => {
    setMapAPILoaded(true);
    setMap(map);
    setMapAPI(maps);
  };

  const data = {
    map,
    mapAPI,
    mapAPILoaded,
  };
  return (
    <mapContext.Provider value={data}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_MAP_API_KEY,
          libraries: ["places"],
        }}
        defaultCenter={defaultLocation}
        center={location}
        zoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        {...props}
      >
        {props.children}
      </GoogleMapReact>
      {/* {props.children} */}
    </mapContext.Provider>
  );
}
