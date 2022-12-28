import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Markers from "./Markers";
import "./Map.css";

export default function Map() {
  const zoom = 10;
  const myKey = process.env.REACT_APP_MAP_API_KEY;
  const [location, setLocation] = useState({
    lat: 43.6532,
    lng: -79.3832,
  });
  useEffect(() => {
    function getLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      });
    }
    getLocation();
  }, []);
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
