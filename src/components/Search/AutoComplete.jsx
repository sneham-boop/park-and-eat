import { usePlacesWidget } from "react-google-autocomplete";
import React from "react";

export default function AutoComplete(props) {
  const myKey = process.env.REACT_APP_MAP_API_KEY;
  const { setAddress, setCalc } = props;
  const { ref: locationRef } = usePlacesWidget({
    apiKey: myKey,
    onPlaceSelected: (place) => {
      setAddress(
        place.formatted_address,
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
      // setCalc(true);
    },
    options: {
      types: ["park"],
      componentRestrictions: { country: "ca" },
      fields: ["name", "formatted_address", "geometry"],
    },
    inputAutocompleteValue: "text",
  });

  return (
    <>
      <input
        type="text"
        ref={locationRef}
        placeholder="Where do you want to park?"
        autoComplete="text"
      />
    </>
  );
}
