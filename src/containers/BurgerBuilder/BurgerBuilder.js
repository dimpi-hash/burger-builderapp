import React, { Component } from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal.js";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Checkout from "../Checkout/Checkout.js";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import * as burgerBuilderActions from "../../store/actions/index.js";

class BurgerBuilder extends Component {
  // constructor(props){
  // super(props)
  // this.state={

  // }        old method
  state = {
    // ingredients: {
    //   salad: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0,
    // },

    //purchasable: false,
    purchasing: false,
  };

  //fetch data dynamically from database i.e firefox

  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredients();
  }
  updatePurchaseState = (ingredients) => {
    // let ingredients = {
    //   ...this.state.ingredients,
    // };
    //add all price of ingredients
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((acc, el) => {
        return acc + el;
      }, 0);

    return sum > 0;
  };

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];

  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients, //creading new object or array using spread operator
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = priceAddition + oldPrice;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };  //

  purchaseHandler = () => {
    if(this.props.isAuthenticated){

      this.setState({purchasing: true,});
    }
    else
    {
      this.props.onSetAuthRedirectPath("/checkout")
      this.props.history.push("/auth")
    }
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  continueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString,
    // });
  };

  // removeIngredientCount = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients, //creading new object or array using spread operator
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = updatedIngredients[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = priceDeduction + oldPrice;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  render() {
    const disablesInfo = {
      ...this.props.ings,
    };
    for (let key in disablesInfo) {
      disablesInfo[key] = disablesInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onAddIngredient}
            ingredientsRemoved={this.props.onRemoveIngredients}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
            disabled={disablesInfo}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancel={this.purchaseCancelHandler}
          continue={this.continueHandler}
          price={this.props.price}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice, //here state is of reducer
    error: state.burgerReducer.error,
    isAuthenticated:state.authReducer.token!==null,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onAddIngredient: (ingName) =>
//       dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
//     onRemoveIngredients: (ingName) =>
//       dispatch({
//         type: actionTypes.REMOVE_INGREDIENT,
//         ingredientName: ingName,
//       }),
//   };
// };   BEFORE USING ACTION CREATER

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onRemoveIngredients: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath:(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path)) 
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
