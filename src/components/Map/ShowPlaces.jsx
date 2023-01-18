import React, { useEffect, useRef } from "react";
import Place from "./Place";

const ShowPlaces = ({ places }) => {
  const divDisplayResults = useRef(null);

  const displayPlaces = (places) => {
    return places.map((place, id) => {
      const { formatted_address, rating, name, photos } = place;
      const placeInfo = { num:id+1, formatted_address, rating, name };
      const image = photos[0];
      return <Place key={id} place={placeInfo} image={image}/>;
    });
  };

  return (
    <div className="places-container">
      <h3>We found these for you!</h3>
      <div className="places" ref={divDisplayResults}>
        {places && displayPlaces(places)}
      </div>
    </div>
  );
};

export default ShowPlaces;
