import React from "react";
import classes from "./Button.module.css";

const button = (props) => (
  <button
    disabled={props.disabled}
    onClick={props.clicked}
    className={[classes.Button, classes[props.btnType]].join(" ")} //joining coz we have classes as arrays of string,join makes string in the end
  >
    {props.children}
  </button>
);

export default button;
