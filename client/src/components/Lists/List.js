import React from "react";
import axios from "axios";
import { Button, Modal, ModalBody, Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import AddForm from "./AddForm.js";
import EditForm from "./EditForm";
import NavBar from "../Nav/NavBar.js";
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

    this.token = localStorage.getItem("token");
    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleEditOn = this.toggleEditOn.bind(this);
    this.toggleEditOff = this.toggleEditOff.bind(this);
  }

  componentDidMount() {
    if (this.token) {
      this.getList();

      setInterval(() => this.getList(), 1000);
    }
  }

  getList() {
    const token = this.token;

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
    const token = this.token;

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
    if (!this.token) {
      return <Redirect to="/" />;
    }
    return (
      <div className="list">
        <header>
          <NavBar />
        </header>
        <Container className="list-container">
          <Row className="align-items-center justify-content-center">
            <Col sm="6" className="add-column">
              <Button
                color="primary"
                size="lg"
                className="add-button"
                onClick={this.toggleAdd}
              >
                Add Item
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              {this.state.lists.map((item, index) => (
                <Row key={index}>
                  <Col sm="8">
                    <p>{item.name}</p>
                  </Col>
                  <Col sm="2">
                    {item.complete ? (
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
      </div>
    );
  }
}

export default List;
