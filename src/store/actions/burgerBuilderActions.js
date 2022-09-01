//here we will create action creaters for addIngredient and remove

import * as actionTypes from "./actionTypes.js";
import axios from "../../axios-orders.js";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
//here init means at time of initialiation ingredients will be fetched
//here dispatched is used and here returning dispatch is a syntax of thunk
export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(
        "https://react-burger-app-8d708-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        //   this.setState({ ingredients: response.data });
        dispatch(setIngredients(response.data));
      }).catch = (error) => {
      dispatch(fetchIngredientsFailed());
    };
  };
};
