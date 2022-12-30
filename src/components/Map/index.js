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
    // Bound search box feature to input element with options
    const input = ReactDOM.findDOMNode(searchInputRef.current);
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: ["park"],
      componentRestrictions: { country: "ca" },
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
        console.log(place);
        // const request = {
        //   placeId: place.placeId,
        //   fields: ["name", "formatted_address", "place_id", "rating"],
        // };
        // showDetailsOnPage(request);
      });
      map.fitBounds(bounds);
    };
    searchBox.addListener("places_changed", onPlacesChanged);

    // Retreiving details for search results.
    // const showDetailsOnPage = (request) => {
    //   // const request = {
    //   //   placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    //   //   fields: ["name", "formatted_address", "place_id", "geometry"],
    //   // };
    //   const infowindow = new maps.InfoWindow();
    //   const service = new maps.places.PlacesService(map);
    //   service.getDetails(request, (place, status) => {
    //     if (
    //       status === maps.places.PlacesServiceStatus.OK &&
    //       place &&
    //       place.geometry &&
    //       place.geometry.location
    //     ) {
    //       const marker = new maps.Marker({
    //         map,
    //         position: place.geometry.location,
    //       });

    //       maps.event.addListener(marker, "click", () => {
    //         const content = document.createElement("div");
    //         const nameElement = document.createElement("h2");

    //         nameElement.textContent = place.name;
    //         content.appendChild(nameElement);

    //         const placeIdElement = document.createElement("p");

    //         placeIdElement.textContent = place.place_id;
    //         content.appendChild(placeIdElement);

    //         const placeAddressElement = document.createElement("p");

    //         placeAddressElement.textContent = place.formatted_address;
    //         content.appendChild(placeAddressElement);
    //         infowindow.setContent(content);
    //         infowindow.open(map, marker);
    //       });
    //     }
    //   });
    // };

    //
  };

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
        </div>
      </div>
    </>
  );
}
