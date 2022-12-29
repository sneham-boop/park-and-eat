import React from "react";
import Button from "../Button";
import "./Footer.scss";

export default function Footer() {
  const btnText = "GO UP";
  const handleScroll = () => {
    const element = document.getElementsByClassName("home");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <Button btnText={btnText} onClick={() => handleScroll()} />
    </footer>
  );
}
