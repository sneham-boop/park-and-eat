import React, { useState, useRef, useEffect } from "react";
// import Markers from "./Markers";
import Button from "../Button";
import "./Map.scss";
import ShowPlaces from "./ShowPlaces";
import GoogleMap from "../GoogleMap";
import SearchInput from "./SearchInput";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Map() {
  const { getLocalStorage } = useLocalStorage();
  const [placesSearched, setPlacesSearched] = useState([]);
  const [newCenter, setNewCenter] = useState(getLocalStorage("location"));
  const [searchButton, setSearchButton] = useState(false);
  const searchInputRef = useRef(null);
  const btnText = "Search";
  const handleClick = () => {
    console.log("Searching!");
    setSearchButton(true);
  };

  useEffect(() => {
    console.log("We found these.", placesSearched);
    setSearchButton(false);
  }, [placesSearched]);

  return (
    <>
      <div className="map-container">
        <div className="search-container">
          <h2>Map</h2>
          <div className="search-results">
            <div className="search">
              <input
                type="text"
                ref={searchInputRef}
                placeholder="Where do you want to park?"
                autoComplete="text"
              />
              <Button btnText={btnText} onClick={handleClick} />
            </div>

            {searchButton && <ShowPlaces places={placesSearched} />}
          </div>
        </div>

        <GoogleMap center={newCenter} >
          <SearchInput
            searchRef={searchInputRef}
            setPlacesSearched={setPlacesSearched}
            triggerSearch={searchButton}
            setNewCenter={setNewCenter}
          />
        </GoogleMap>
      </div>
    </>
  );
}
