import React from "react";
import Button from "../Button";
import Logo from "./Logo";
import "./Navigation.scss";

export default function Navigation(props) {
  const handleClick = () => {
    
  }
  return (
    <nav className="nav">
      <a href="#">
        <Logo />
      </a>
      <a href="#">HOME</a> |<a href="#">SOME</a> |<a href="#">LINK</a> |
      <a href="#">LINKS</a>
      <Button btnText="Login" onClick={handleClick} />
    </nav>
  );
}
