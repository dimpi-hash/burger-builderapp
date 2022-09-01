import * as actionType from "../actions/actionTypes.js";

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 1.3,
  cheese: 0.5,
  meat: 3,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building:false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
          //HERE [] MEANS IN ES6 FETCHING DATA DYNAMICALLY
          //name after action is actually
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building:true,
      };

    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
          totalPrice:state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
          building:true,
        },
      };

    case actionType.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
          bacon: action.ingredients.bacon,
        },
        totalPrice: 4,
        error: false,
        building:false,
      };

    case actionType.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
  return state;
};

export default reducer;
