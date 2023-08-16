import { Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Corrected import for FaShoppingCart

import {LinkContainer} from "react-router-bootstrap"
import React from 'react';
import logo from "../assets/steno_logo.jpg";

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand>
          <img src={logo} alt='stenoShop' className="stenoLogo"/>
            StenoShop
          
          </Navbar.Brand>
          </LinkContainer>
         
      
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"> {/* Changed <nav> to <Nav> */}
              <Nav.Link href="/cart"><FaShoppingCart style={{ color: 'white' }}/> Cart</Nav.Link> {/* Corrected icon name */}
              <Nav.Link href="/signin"><FaUser style={{ color: 'white' }}/> Sign In</Nav.Link> {/* Changed href to /signin */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
