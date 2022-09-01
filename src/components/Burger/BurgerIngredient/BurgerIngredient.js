import React, { Component } from "react";
import classes from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

class BurgerIngredients extends Component {
  render() {
    let ingredients = null;

    switch (this.props.type) {
      case "bread-bottom":
        ingredients = <div className={classes.BreadBottom}></div>;
        break;

      case "bread-top":
        ingredients = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
            <div></div>
          </div>
        );
        break;

      case "meat":
        ingredients = <div className={classes.Meat}></div>;
        break;

      case "cheese":
        ingredients = <div className={classes.Cheese}></div>;
        break;

      case "salad":
        ingredients = <div className={classes.Salad}></div>;
        break;

      case "bacon":
        ingredients = <div className={classes.Bacon}></div>;
        break;

      default:
        ingredients = null;
    }
    return ingredients;
  }
}

//validation of propsType and in this props is used b4 it was functional component and now it is classes so props will be used with this.props
BurgerIngredients.propTypes = {
  type: PropTypes.string,
};
export default BurgerIngredients;
