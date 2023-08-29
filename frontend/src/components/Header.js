// Import necessary components and icons from React and react-bootstrap

import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Corrected import for FaShoppingCart

import { LinkContainer } from "react-router-bootstrap"; // Import LinkContainer for routing
import React from 'react';
import logo from "../assets/steno_logo.jpg"; // Import logo image.
import { useSelector } from "react-redux/es/hooks/useSelector";

/* Import useSelector to access Redux state*/

const Header = () => {
  // Use useSelector to get cartItems from the Redux store's cart state
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems); // Log the cart items to the console

  return (
    <header>
      {/* Create a Bootstrap Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* Wrap the brand logo in a LinkContainer for routing */}
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt='stenoShop' className="stenoLogo"/>
              StenoShop
            </Navbar.Brand>
          </LinkContainer>
         
          {/* Add a responsive toggle button for collapsed navigation */}
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>

          {/* Collapsible navigation */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"> {/* Use the Nav component for navigation */}
              {/* Cart link */}
              <Nav.Link href="/cart">
                {/* Cart icon */}
                <FaShoppingCart style={{ color: 'white' }}/> Cart
                {/* Display cart badge only if there are items in the cart */}
                {cartItems.length > 0 && (
             <Badge pill bg="success" style={{ marginLeft: "5px" }}>
              {/* Calculate the total quantity of items in the cart */}
                {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              
              {/* Sign In link */}
              <Nav.Link href="/signin">
                {/* User icon */}
                <FaUser style={{ color: 'white' }}/> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header; // Export the Header component as the default export
