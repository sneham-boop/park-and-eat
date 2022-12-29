import React, { useContext } from "react";
import Button from "../Button";
import Logo from "./Logo";
import { authContext } from "../../providers/AuthProvider";
import "./Navigation.scss";

export default function Navigation(props) {
  const { auth, login, logout } = useContext(authContext);
  const btnText = auth ? "Logout" : "Login";
  const handleClick = () => {
    auth ? logout() : login();
  };

  return (
    <nav className="nav">
      <Logo />
      <Button btnText={btnText} onClick={handleClick} />
    </nav>
  );
}
