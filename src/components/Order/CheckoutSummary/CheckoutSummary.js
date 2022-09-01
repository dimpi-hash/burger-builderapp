import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button.js";
import classses from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={classses.CheckoutSummary}>
      <h1>we hope it tastes well!!!!!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.checkoutCancelled} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.checkoutContinued} btnType="Success">
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
