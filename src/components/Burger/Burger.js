import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  const builderIngredients = props.ingredients;

  let transformedIngredients = Object.keys(builderIngredients)
    .map((igkey) => {
      return [...Array(Math.max(0, props.ingredients[igkey]))].map((_, i) => {
        return <BurgerIngredients key={igkey + i} type={igkey} />;
        console.log(transformedIngredients.length);
      });
    })

    // let transformedIngredients = Object.keys(props.ingredients)
    //   .map((igKey, i) => <BurgerIngredients key={igKey + i} type={igKey} />)

    .reduce((prevarr, current) => {
      return prevarr.concat(current);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>please start adding ingredients!!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />

      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default burger;
