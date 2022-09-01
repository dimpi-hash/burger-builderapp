import React from "react";
import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import burgerBuilderReducer from "./store/reducers/burgerBuilderReducer";
import orderReducer from "./store/reducers/order.js";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import order from "./components/Order/Order";
import auth from "./store/reducers/auth.js"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerReducer: burgerBuilderReducer,
  orderReducer: orderReducer,
  authReducer:auth,
});

// const store = createStore(burgerBuilderReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//HERE WE USE DEVTOOLS BASIC TO BUILD SIMPLE DEVTOOL INORDER TO ACCESS FROM BROWSER BUT NOW WE WANT MIDDLEWARE FOR THAT WE USE ENCHANCER
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> //with provider store is a property
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// ReactDOM.render(app, document.getElementById("root"));
// registerServiceWorker();
