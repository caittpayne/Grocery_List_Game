import React from "react";
import RegisterForm from "./Form";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import NavBar from "../Nav/NavBar";

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
      <div className="signIn">
        <header>
          <NavBar />
        </header>
        <Container>
          <Row className="justify-content-center">
            <Col lg="6">
              <Row>
                <Col sm="10" className="form-container">
                  <RegisterForm setRedirect={() => this.setRedirect()} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
