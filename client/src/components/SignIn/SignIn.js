import React, { Component } from "react";
import SignInForm from "./Form";
import { Container, Button, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import "./styles.css";

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
      <Container fluid className="sign-container">
        <Row className="row">
          <Col lg="12" className="form align-self-center">
            <SignInForm goToLists={() => this.goToLists()} />
            <Button color="link" onClick={() => this.goToRegister()}>
              Sign Up
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignIn;
