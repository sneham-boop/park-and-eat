import React from "react";

export default function Place ({ place, image }) {
  return (
    <section className="place">
      <img className="place-image" src={image.getUrl()}/>
      <h4>{place.num}. {place.name}</h4>
      <p>Address: {place.formatted_address}</p>
      <p>Rating: {place.rating}</p>
    </section>
  );
};
