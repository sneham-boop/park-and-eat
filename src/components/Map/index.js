import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import GoogleMapReact from "google-map-react";
import Markers from "./Markers";
import "./Map.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import ShowPlaces from "./ShowPlaces";

export default function Map() {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const zoom = 10;
  const defaultLocation = { lat: 43.6532, lng: -79.3832 };
  const myKey = process.env.REACT_APP_MAP_API_KEY;
  const [placesSearched, setPlacesSearched] = useState([]);
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

  // Runs after Maps API is loaded
  const handleApiLoaded = (map, maps) => {
    // Bound search box feature to input element with options
    const input = ReactDOM.findDOMNode(searchInputRef.current);
    const options = {
      types: ["park"],
      componentRestrictions: { country: "ca" },
      fields: ["name", "formatted_address", "geometry"],
      radius: 1000,
    };
    const searchBox = new maps.places.SearchBox(input, options);

    // Changes the scope of the search box based on movement of map.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    // Places Google's default icon markers on the locations found by the query.
    let markers = [];
    const onPlacesChanged = () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      // setPlacesSearched((prev)=>{
      //   const newPlaces = [...places];
      //   prev = [newPlaces];
      // });
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        setPlacesSearched((prev) => {
          const oldPlaces = [...prev];
          return [...oldPlaces, place];
        });
        const icon = {
          url: place.icon,
          size: new maps.Size(71, 71),
          origin: new maps.Point(0, 0),
          anchor: new maps.Point(17, 34),
          scaledSize: new maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    };
    searchBox.addListener("places_changed", onPlacesChanged);
  };

  // Print places when new places are found.
  useEffect(() => {
    // console.log("I found these!", placesSearched);
  }, [placesSearched]);
  return (
    <>
      <div className="map-container">
        <h2>Map</h2>
        <div id="map" className="map">
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
          {placesSearched.length !== 0 && (
            <ShowPlaces places={placesSearched} />
          )}
        </div>
      </div>
    </>
  );
}
