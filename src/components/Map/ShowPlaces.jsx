import React, { useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
// import Place from "./Place";

const ShowPlaces = ({ places }) => {
  const divDisplayResults = useRef(null);

  useEffect(() => {
    let results = divDisplayResults.current;
    places.forEach((place, id) => {
      const placeContainer = document.createElement("div");
      placeContainer.setAttribute("id", `place-${id}`);
      const heading = document.createElement("h3");
      heading.textContent = place.name;

      const rating = document.createElement("p");
      rating.textContent = place.rating;
      const address = document.createElement("p");
      address.textContent = place.formatted_address;
      placeContainer.appendChild(heading, rating, address);
      placeContainer.appendChild(rating);
      placeContainer.appendChild(address);
      results.appendChild(placeContainer);
    });
  }, [places]);

  return (
    <div className="places-container">
      <h3>We found these for you!</h3>
      <div ref={divDisplayResults}></div>
    </div>
  );
};

export default ShowPlaces;
