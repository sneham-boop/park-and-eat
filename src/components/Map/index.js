import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
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
  const searchInputRef = useRef(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
      setLocalStorage("location", { lat: latitude, lng: longitude });
    });
  }, [setLocalStorage]);

  const handleApiLoaded = (map, maps) => {
    const input = ReactDOM.findDOMNode(searchInputRef.current);
    console.log(input);
    // const searchBox = new maps.places.SearchBox(input);
    return;
  };

  return (
    <>
      <div className="map-container">
        <h2>Map</h2>
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: myKey,
              libraries: ["places"],
            }}
            defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
            center={location}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <Markers
              lat={location.lat}
              lng={location.lng}
              id="Me"
              description="You are here!"
            />
          </GoogleMapReact>
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Where do you want to park?"
            autoComplete="text"
          />
        </div>
      </div>
    </>
  );
}
