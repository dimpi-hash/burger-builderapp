import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show || //this is for modal
      nextProps.children !== this.props.children //this is for order summary as it is changing nd updating as well that is the children of modal
    );
  }

  componentDidUpdate() {
    console.log("[Modal.js] will update");
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
        ;
      </Aux>
    );
  }
}

export default Modal;
