import React from "react";

const Place = ({ place }) => {
  const { name, rating, formatted_address } = place;
  return (
    <section className="place">
      <h3>{name}</h3>
      <p>Rating: ${rating}</p>
      <p>Address: ${formatted_address}</p>
    </section>
  );
};

export default Place;
