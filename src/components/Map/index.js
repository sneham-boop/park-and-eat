import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Markers from "./Markers";
import "./Map.css";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Map() {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const zoom = 10;
  const defaultLocation = { lat: 43.6532, lng: -79.3832 };
  const myKey = process.env.REACT_APP_MAP_API_KEY;
  const [location, setLocation] = useState(
    getLocalStorage("location") || defaultLocation
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
      setLocalStorage("location", { lat: latitude, lng: longitude });
    });
  }, [setLocalStorage]);
  
  return (
    <>
      <div className="map-container">
        <h2>Map</h2>
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: myKey,
            }}
            defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
            center={location}
            defaultZoom={zoom}
          >
            <Markers
              lat={location.lat}
              lng={location.lng}
              id="Me"
              description="You are here!"
            />
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
}
