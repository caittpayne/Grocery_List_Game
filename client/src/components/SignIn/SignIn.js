import React, { Component } from "react";
import SignInForm from "./Form";
import { Container, Button, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import NavBar from "../Nav/NavBar.js";
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
      <div className='signIn'>
        <header>
          <NavBar />
        </header>
        <Container>
          <Row className='justify-content-center'>
            <Col lg="6">
              <Row>
                <Col sm="10" className='form-container'>
                  <SignInForm goToLists={() => this.goToLists()} />
                  <Button className='register-button' color='link' onClick={() => this.goToRegister()}>
                    Register
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SignIn;
