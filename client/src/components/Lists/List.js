import React from "react";
import axios from "axios";
import { Button, Modal, ModalBody, Container, Row, Col } from "reactstrap";
import AddForm from "./AddForm.js";
import EditForm from "./EditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      activeList: false,
      modalAdd: false,
      modalEdit: false
    };

    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleEditOn = this.toggleEditOn.bind(this);
    this.toggleEditOff = this.toggleEditOff.bind(this);
  }

  componentDidMount() {
    this.getList();

    setInterval(() => this.getList(), 1000);
  }

  getList() {
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

  toggleAdd() {
    this.setState({
      modalAdd: !this.state.modalAdd
    });
  }

  toggleEditOn(item) {
    this.setState({
      modalEdit: !this.state.modalEdit,
      activeList: item
    });
  }

  toggleEditOff() {
    this.setState({
      modalEdit: !this.state.modalEdit
    });
  }

  markDone(item) {
    const token = localStorage.getItem("token");

    axios
      .put(
        `${process.env.REACT_APP_URL}/lists/${item._id}/update`,
        { name: item.name, complete: !item.complete },
        { headers: { "x-auth": token } }
      )
      .then(res => {
        this.getList();
      })
      .catch(err => {
        console.log("error " + err);
      });
  }

  render() {
    return (
      <Container className="list-container">
        <Row>
          <Col sm="12">
            {this.state.lists.map((item, index) => (
              <Row key={index}>
                <Col sm="8">
                  <p>{item.name}</p>
                </Col>
                <Col sm="2">
                  {//Check if message failed
                  item.complete ? (
                    <FontAwesomeIcon
                      onClick={() => this.markDone(item)}
                      icon="check-square"
                    />
                  ) : (
                    <FontAwesomeIcon
                      onClick={() => this.markDone(item)}
                      icon="square"
                    />
                  )}
                </Col>
                <Col sm="2">
                  <FontAwesomeIcon
                    onClick={() => this.toggleEditOn(item)}
                    icon="edit"
                  />
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
        <Row>
          <Button
            color="primary"
            size="lg"
            className="modalButton"
            onClick={this.toggleAdd}
          >
            Add Item
          </Button>
          <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd}>
            <ModalBody className="modalContainer">
              <AddForm
                toggleAdd={() => this.toggleAdd()}
                getList={() => this.getList()}
              />
            </ModalBody>
          </Modal>
          <Modal isOpen={this.state.modalEdit} toggle={this.toggleEditOn}>
            <ModalBody className="modalContainer">
              <EditForm
                toggleEditOff={() => this.toggleEditOff()}
                activeList={this.state.activeList}
                getList={() => this.getList()}
              />
            </ModalBody>
          </Modal>
        </Row>
      </Container>
    );
  }
}

export default List;
