import React from "react";
import RegisterForm from "./Form";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <section className="register">
        <section className="register-container">
          <RegisterForm setRedirect={() => this.setRedirect()} />
        </section>
      </section>
    );
  }
}

export default Register;
