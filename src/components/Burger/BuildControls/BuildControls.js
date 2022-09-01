import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl.js";

const controls = [
  { label: "salad", type: "salad" },
  { label: "cheese", type: "cheese" },
  { label: "meat", type: "meat" },
  { label: "bacon", type: "bacon" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price:<strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => {
          props.ingredientsAdded(ctrl.type);
        }}
        removed={() => {
          props.ingredientsRemoved(ctrl.type);
        }}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth?"ORDER NOW":"SIGN UP TO CONTINUE"}
    </button>
  </div>
);

export default buildControls;
