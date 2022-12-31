import React from "react";
import Button from "../Button";
import AutoComplete from "./AutoComplete";
import "./Search.scss";

export default function Search(props) {
  const btnText = "Search";
  const handleClick = () => {
    console.log("Searching!");
  };

  return (
    <div className="search">
      <AutoComplete/>
      <Button btnText={btnText} onClick={handleClick} />
    </div>
  );
}
