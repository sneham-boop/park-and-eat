import React from "react";

export default function Place ({ place, image }) {
  return (
    <section className="place">
      {image && <img alt="The places that were found" className="place-image" src={image.getUrl()}/>}
      <h4>{place.num}. {place.name}</h4>
      <p>Address: {place.formatted_address}</p>
      <p>Rating: {place.rating}</p>
    </section>
  );
};
