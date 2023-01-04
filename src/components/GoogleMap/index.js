// import React, { useEffect, useState, useContext } from "react";
import MapProvider from "../../providers/MapProvider";
import "./GoogleMap.scss";

const GoogleMap = ({ children, ...props }) => {
  // const {center} = props;
  // console.log(center);
  return (
    <>
      <div id="map">
        <MapProvider {...props} >{children}</MapProvider>
      </div>
    </>
  );
};

export default GoogleMap;
