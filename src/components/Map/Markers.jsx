import React from "react";

const Markers = ({ id, $hover, description, distance, date }) => {
  return (
    <div className={$hover ? "circle hover" : "circle"}>
      <span className="circleText">Here.</span>
    </div>
  );
};

export default Markers;
