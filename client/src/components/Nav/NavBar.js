import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import './styles.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getToken() {
    const token = localStorage.getItem("token");
    
    return token;
  }

  signOut() {
    localStorage.removeItem("token");
  }

  render() {
    return (
      <div>
        <Navbar light expand="md" className='navbar'>
          <NavbarBrand className='logo' href="/">Grocery Game List</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.getToken() ? (
                <NavItem>
                  <NavLink href="/list">List</NavLink>
                </NavItem>
              ) : (
                ""
              )}
              <NavItem>
                {this.getToken() ? (
                  <NavLink onClick={() => this.signOut()}>Sign Out</NavLink>
                ) : (
                  <NavLink href="/">Sign In</NavLink>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
