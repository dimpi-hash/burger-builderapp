import React, { Component } from "react";
import Aux from "../Auxillary/Auxillary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

class Layout extends Component {
  state = {
    showSlideDrawer: false,
  };
  sideDrawerCloseHandler = () => {
    this.setState({
      showSlideDrawer: false,
    });
  };

  sideDrawerToggleHandler = () => {
    // this.setState({
    //   showSlideDrawer:!this.state.showSlideDrawer
    // })   nothing in function ,this is not good practice

    this.setState((prevState) => {
      return {
        showSlideDrawer: !prevState.showSlideDrawer, //return with {}
      };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        isAuth={this.props.isAuthenticated}
        <SideDrawer
        isAuth={this.props.isAuthenticated}
          open={this.state.showSlideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps=(state)=>
{
  return{
      isAuthenticated:state.authReducer.token!==null,
  }
  
}

export default connect(mapStateToProps)(Layout);
