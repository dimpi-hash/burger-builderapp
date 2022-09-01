import React, { Component } from "react";
import Aux from "../Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import axios from "axios";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount = () => {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
      });

      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    };

    componentWillUnmount() {
      console.log("unmounting", this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;

//in <modal show></modal> where keeping value of show to be true

// const withErrorHandler = (WrappedComponent) => {
//   return (props) => {
//     return (
//       <Aux>
//         <Modal show>Something went wrong!!</Modal>
//         <WrappedComponent {...props} />
//       </Aux>
//     );
//   };
// }; here

//above code is a function of wrapping global error and returning classes
//in order to add component methods in it
