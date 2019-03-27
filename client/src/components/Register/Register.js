import React from "react";
import RegisterForm from "./Form";
import { Container, Row, Col } from "reactstrap";
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
      <Container fluid className="sign-container">
        <Row className="row">
          <Col lg="12" className="form align-self-center">
            <RegisterForm setRedirect={() => this.setRedirect()} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
