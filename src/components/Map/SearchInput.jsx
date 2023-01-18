import React, { useContext, useRef, useState, useEffect } from "react";
import { mapContext } from "../../providers/MapProvider";
import cafeIcon from "../../docs/cafe_icon.svg";
import garageIcon from "../../docs/garage.svg";

const SearchInput = ({
  searchRef,
  setPlacesSearched,
  triggerSearch,
  setNewCenter,
}) => {
  const { map, mapAPI } = useContext(mapContext);
  let autoCompleteRef = useRef(null);
  let autoCompleteLocationMarker = null;

  const onPlaceChanged = (map, maps, marker, autoCompleteBox) => {
    const place = [autoCompleteBox.getPlace()];
    if (!place) {
      return;
    }
    marker.setMap(null);
    // console.log(autoCompleteLocationMarker);
    // Get the name and location for place.
    // const bounds = new maps.LatLngBounds();

    place.forEach((p) => {
      if (!p.geometry || !p.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      autoCompleteLocationMarker = new maps.Marker({
        map,
        title: p.name,
        position: p.geometry.location,
      });
      // console.log(autoCompleteLocationMarker);
      setNewCenter({
        lat: p.geometry.location.lat(),
        lng: p.geometry.location.lng(),
      });

      // if (p.geometry.viewport) {
      //   // Only geocodes have viewport.
      //   bounds.union(p.geometry.viewport);
      // } 
      // else {
      //   bounds.extend(p.geometry.location);
      // }

      if (p.geometry && p.geometry.location) {
        map.panTo(p.geometry.location);
        // map.setZoom(16);
        clearMarkers();
        searchPlaces("restaurants", cafeIcon);
        // findRest && searchPlaces("parking", garageIcon);
      }
    });
    // map.fitBounds(bounds);
  };

  let markers = [];
  let places;
  function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
      if (markers[i]) {
        markers[i].setMap(null);
      }
    }

    markers = [];
  }

  // function clearResults() {
  //   const results = document.getElementById("results");

  //   while (results.childNodes[0]) {
  //     results.removeChild(results.childNodes[0]);
  //   }
  // }

  function dropMarker(i) {
    return function () {
      markers[i].setMap(map);
    };
  }

  const searchPlaces = (query, icon) => {
    console.log("Searching!")
    const search = {
      bounds: map.getBounds(),
      types: [query],
    };

    places.nearbySearch(search, (results, status, pagination) => {
      if (status === mapAPI.places.PlacesServiceStatus.OK && results) {
        // clearResults();
        // clearMarkers();

        // Create a marker for each hotel found, and
        // assign a letter of the alphabetic to each marker icon.
        for (let i = 0; i < results.length; i++) {
          const markerLetter = String.fromCharCode(
            "A".charCodeAt(0) + (i % 26)
          );
          const markerIcon = icon;

          // Use marker animation to drop the icons incrementally on the map.
          markers[i] = new mapAPI.Marker({
            position: results[i].geometry.location,
            animation: mapAPI.Animation.DROP,
            icon: markerIcon,
          });
          // If the user clicks a hotel marker, show the details of that hotel
          // in an info window.
          // @ts-ignore TODO refactor to avoid storing on marker
          markers[i].placeResult = results[i];
          // mapAPI.event.addListener(markers[i], "click", showInfoWindow);
          setTimeout(dropMarker(i), i * 100);
          // addResult(results[i], i);
        }
      }
    });
    return true;
  };

  const input = searchRef.current;

  const options = {
    types: ["parking", "neighborhood", "locality"],
    componentRestrictions: { country: "ca" },
    fields: ["name", "formatted_address", "geometry"],
  };

  useEffect(() => {
    if (mapAPI) {
      autoCompleteLocationMarker = new mapAPI.Marker();
      let autoCompleteBox = autoCompleteRef.current;
      autoCompleteBox = new mapAPI.places.Autocomplete(input, options);
      places = new mapAPI.places.PlacesService(map);

      autoCompleteBox.addListener("place_changed", () =>
        onPlaceChanged(map, mapAPI, autoCompleteLocationMarker, autoCompleteBox)
      );
      autoCompleteBox.bindTo("bounds", map);
    }
  }, []);

  return <></>;
};

export default SearchInput;
