import React, { useEffect, useState, useContext } from "react";
import MapProvider from "./providers/MapProvider";

const GoogleMap = ({ children }) => {
  return <MapProvider>{children}</MapProvider>;
};

export default GoogleMap;
