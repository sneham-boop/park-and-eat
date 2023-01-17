import React, { useContext, useRef, useState } from "react";
import { mapContext } from "../../providers/MapProvider";

const SearchInput = ({
  searchRef,
  setPlacesSearched,
  triggerSearch,
  setNewCenter,
}) => {
  const { map, mapAPI } = useContext(mapContext);
  const [markers, setMarkers] = useState([]);
  let searchInputGoogleMap = useRef(null);

  const onPlacesChanged = (map, maps, markers, searchBox) => {
    const places = searchBox.getPlaces();
    
    if (places.length === 0) {
      return;
    }
    // console.log(places);
    // Clear out the old markers.
    setPlacesSearched(() => [...places]);
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    // markers = [];
    setMarkers([]);

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
      // markers.push(
      //   new maps.Marker({
      //     map,
      //     icon,
      //     title: place.name,
      //     position: place.geometry.location,
      //   })
      // );
      setMarkers((prev) => {
        return [
          ...prev,
          new maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          }),
        ];
      });
      setNewCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  };

  const input = searchRef.current;

  const options = {
    types: ["park"],
    componentRestrictions: { country: "ca" },
    fields: ["name", "formatted_address", "geometry"],
  };

  // useEffect(() => {
    if (mapAPI) {
      let inp = searchInputGoogleMap.current;
      inp = new mapAPI.places.SearchBox(input, options);

      // Changes the scope of the search box based on movement of map.
      // map.addListener("bounds_changed", () => {
      //   inp.setBounds(map.getBounds());
      // });
      inp.addListener("places_changed", () =>
        onPlacesChanged(map, mapAPI, markers, inp)
      );
      inp.bindTo("bounds", map);
    }
  // }, []);

  return <></>;
};

export default SearchInput;
