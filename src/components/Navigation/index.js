import React, { useContext } from "react";
import Button from "../Button";
import Logo from "./Logo";
import { authContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import "./Navigation.scss";

export default function Navigation(props) {
  const { auth, login, logout } = useContext(authContext);
  const btnText = auth ? "Logout" : "Login";
  const handleClick = () => {
    auth ? logout() : login();
  };

  return (
    <nav className="nav">
      <Link to="/home">
        <Logo />
      </Link>
      <div className="nav-right-group">
        <Link to="/home">
          <Button btnText={"Home"} />
        </Link>
        <Link to="/map">
          <Button btnText={"Map"} />
        </Link>
        <Button btnText={btnText} onClick={handleClick} />
      </div>
    </nav>
  );
}
