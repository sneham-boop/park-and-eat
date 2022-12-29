import React from "react";
import "./Button.scss";

function Button(props) {
  const { btnText, onClick, custom, icon } = props;
  return (
    <>
      <button className={`button-default ${custom}`} type="button" onClick={onClick}>
        <span>{btnText}</span>
        {icon && <i className={icon} />}
      </button>
    </>
  );
}

export default Button;
