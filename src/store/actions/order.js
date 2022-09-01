//this is used coz we can make action creaters to post our order to database
//WE MERGE THIS WITH CONTACT DATA AS IT HAS ALL DETAILS OR ORDERS THERE

import * as actionTypes from "./actionTypes.js";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};
//this function is used to post order data(dispatch will be return asynchronous code)
export const purchaseBurger = (orderData,token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios.post("/orders.json?auth="+token, orderData)
      .then((response) => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.idToken, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders, //where orders to the left is payload
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios.get("/orders.json?auth=" + token)
      .then((res) => {
        console.log(res.data);
        let fetchedData = [];
        for (let key in res.data) {
          fetchedData.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedData));
      })
      .catch((err) => {
        dispatch(fetchOrderFail(err));
      });
  };
};
