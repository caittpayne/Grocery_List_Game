import React from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { Button, Modal, ModalBody, Container, Row, Col } from "reactstrap";
import ListForm from "./Form/Form.js";

class AllLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
        activeList: false,
      modalOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

 
  componentDidMount() {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_URL}/lists`, {
        headers: { "x-auth": token }
      })
      .then(res => {
        const listArray = [];

        for (let list of res.data) {
          listArray.push(list);
        }

        this.setState({
          lists: listArray
        });
      })
      .catch(err => {
        console.log(err);
      });
  }


  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleClick() {
    this.toggle();
  }

  activeList(index) {
      this.setState({ activeList: index})
  }

  render() {
      if(this.state.goToItem) {
          return <Redirect to='/lists/items' />
      }
    return (
      <Container>
        <Row>
          <Col sm="12">
            {this.state.lists.map((list, index) => (
              <Row key={index}>
                <Col sm="12">
                  <Button onClick={() => {
                      this.props.listClick(list);
                      this.activeList(index);
                  }}>
                    {list.name}
                  </Button>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
        <Row>
          <Button className="modalButton" onClick={this.toggle}>
            Create List
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalBody className="modalContainer">
              <ListForm toggleModal={() => this.toggleModal()} />
            </ModalBody>
          </Modal>
        </Row>
      </Container>
    );
  }
}

export default AllLists;
