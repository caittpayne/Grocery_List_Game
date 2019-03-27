import React, { Component } from "react";
import SignInForm from "./Form/Form";
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }


  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
        return <Redirect to='/lists' />
      }
    return (
      <section className="signIn">
        <section className="login-container">
          <SignInForm setRedirect={() => this.setRedirect()}/>
        </section>
      </section>
    );
  }
}

export default SignIn;
