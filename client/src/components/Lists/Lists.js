import React, { Component } from "react";
import AllLists from "./allLists.js";
import Items from "./Items/Items";
import { Container, Row, Col } from 'reactstrap';


class Lists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedList: ""
    }
  }

  listClick(list) {
    this.setState({
      selectedList: list
    });

    console.log(this.state.selectedList)
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" id="lists">
            <AllLists
              selectedList={this.state.selectedList}
              listClick={list => this.listClick(list)}
            />
            <Items selectedList={this.state.selectedList}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Lists;
