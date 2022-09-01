import React, { Component } from "react";
import { Route, Switch, useHistory,withRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout.js";
import Orders from "./containers/Orders/Orders";
import { createBrowserHistory } from "history";
import Auth from "./containers/Auth/Auth";
import {connect} from "react-redux";
import * as actions from "./store/actions/index.js"

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onTryAutoSignUp:()=>dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(null,mapDispatchToProps)(App));
export const history = createBrowserHistory();
