import React, { Component } from "react";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Button from "../../UI/Button/Button.js";

//in order summary i want output like this <li>salad:1</li> and style={{}} inner bracket is for javascript and used inline style here
class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("[OrderSummary] will update");
  }

  render() {
    let i = 1;
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igkeys) => {
        return (
          <li key={igkeys + i++}>
            <span style={{ textTransform: "capitalize" }}>{igkeys}</span>:
            {this.props.ingredients[igkeys]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order !!</h3>
        <p>Delicious burger with the following ingredients:</p>
        <ol>{ingredientSummary}</ol>
        <p>
          <strong>Total price:{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout!!</p>
        <Button btnType="Danger" clicked={this.props.cancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
