import React from "react";
import ItemForm from "./Form/Form.js";
import { Button, Modal, ModalBody, Container, Row, Col } from "reactstrap";

class Items extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    items: [],
      modalOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const list = this.props.selectedList;
    console.log(list);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleClick() {
    this.toggle();
  }

  render() {
      return (
        <Container>
          <Row>
            <Col sm="12">
              {this.props.selectedList && this.props.selectedList.items.map((item, index) => (
                <Row key={index}>
                  <Col sm="12">
                    <Row>
                      <Col sm="9">{item.name}</Col>
                      <Col sm="3">
                        <p>Check will go here</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
          <Row>
            <Button className="modalButton" onClick={this.toggle}>
              Create Item
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalBody className="modalContainer">
                <ItemForm selectedList={this.props.selectedList}/>
              </ModalBody>
            </Modal>
          </Row>
        </Container> 
      );
  }
}

export default Items;
