import React, { Component } from "react";
import SignInForm from "./Form/Form";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectLists: false,
      redirectRegister: false
    };
  }

  goToLists = () => {
    this.setState({
      redirectLists: true
    });
  };

  goToRegister = () => {
    this.setState({
      redirectRegister: true
    });
  };

  render() {
    if (this.state.redirectLists) {
      return <Redirect to="/lists" />;
    } else if (this.state.redirectRegister) {
      return <Redirect to="register" />;
    }

    return (
      <section className="signIn">
        <section className="login-container">
          <SignInForm goToLists={() => this.goToLists()} />
          <button onClick={() => this.goToRegister()}>Sign Up</button>
        </section>
      </section>
    );
  }
}

export default SignIn;
