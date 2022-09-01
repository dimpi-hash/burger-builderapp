import React, { Component } from "react";
import Button from "../../components/UI/Button/Button.js";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import {connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner.js";
import {Redirect} from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter your email",
        },
        value: " ",
        validation: {
          required: true,
          isEmail: true,
          minLength:true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter your passcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp:true,
  };

  


  checkValidity = (value, rules) => {
    if (!rules) {
      return true;
    }
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid; //trim is used for no white spaces
    }

    if(rules.minLength)
    {
      isValid=value>=rules.minLength&&isValid;
    }
    // if (rules.minLength) {
    //   isValid = value.length >= rules.minLength && isValid;
    // }

    return isValid;
  };

  componentDidMount=()=>{
    if(!this.props.building&&this.props.authRedirectPath!=="/")
    {
      this.props.onSetAuthRedirectPath()
    }
  }

  inputChangedHandler=(event,controlName)=>{
   const updatedControls={
    ...this.state.controls,
    [controlName]:{
      ...this.state.controls[controlName],
      value:event.target.value,
      valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
      touched:true,
    }
   }
     this.setState({controls:updatedControls})
  }

  submitHandler=(event)=>{
    event.preventDefault(); 
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
  }

signAuthModeHandler=()=>{
    this.setState(prevState=>{
           return  {isSignUp:!prevState.isSignUp}
           
    })

 
  }
  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key], //config is right side of key i.e key =email and password
      });
    }

    let form = formElementArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if(this.props.loading)
    {
      form=<Spinner/>
    }

    let errorMessage=null;
    if(this.props.error)
    {
      errorMessage=(
        <p>{this.props.error.message}</p>
      )
    }
//this.props.error.message- as this message property is coming from firebase
let authRedirect=null;
if(this.props.isAuthenticated)
{
   authRedirect=<Redirect to={this.props.authRedirectPath} />
}
return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
          
        </form>
        <Button  
         btnType="Danger"
         clicked={this.signAuthModeHandler}>
          SWITCH TO {this.state.isSignUp?"SIGN IN":"SIGNUP"}</Button>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return{

    loading:state.authReducer.loading,
    error:state.authReducer.error,
    isAuthenticated:state.authReducer.token!==null,
    building:state.burgerReducer.building,
    authRedirectPath:state.authReducer.authRedirectPath,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{

    onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
    onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath("/"))  
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);
