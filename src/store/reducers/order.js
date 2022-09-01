import * as actionTypes from "../actions/actionTypes.js";

const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state, //keeps my old orders
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newData = {
        ...action.orderData,
        id: action.orderId,
        purchased: true,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newData),
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      }; //as error is handled in contactData.js withErrorHandler

    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };

    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

//concat returns new array and we merge immutabily
export default reducer;
