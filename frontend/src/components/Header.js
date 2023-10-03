// Import necessary components and icons from React and react-bootstrap

import { Badge, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Corrected import for FaShoppingCart

import { LinkContainer } from "react-router-bootstrap"; // Import LinkContainer for routing
import React from 'react';
import SearchBox from "./searchBox";
import logo from "../assets/steno_logo.jpg"; // Import logo image.
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cardSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

/* Import useSelector to access Redux state*/

const Header = () => {
  // Use useSelector to get cartItems from the Redux store's cart state
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch(); // For dispatching Redux actions.
  const navigate = useNavigate(); // For client-side navigation.
  const [logoutApiCall] = useLogoutMutation(); // For handling a logout API call.

  // This asynchronous function, 'logoutHandler', handles user logout.
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); // Performs the logout API call and unwraps the result.
      dispatch(logout()); // Dispatches a 'logout' action to update authentication state.
      dispatch(resetCart()) // Dispatch an action to reset the shopping cart state
      navigate("/login"); // Navigates the user to the "/login" route.
    } catch (err) {
      console.log(err); // Logs any errors that occur during the logout process.
    }
  }

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
              <SearchBox />
              
              {/* Cart link */}
              <LinkContainer to='/cart'>
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
              </LinkContainer>
              
     {userInfo ? ( // Check if userInfo is truthy (i.e., user is logged in)
  <NavDropdown title={userInfo.name} id="username">
    {/* Display a dropdown menu with the user's name as the title */}
    <LinkContainer to='/profile'>
      {/* Create a LinkContainer that wraps the 'Profile' navigation item */}
      <NavDropdown.Item>Profile</NavDropdown.Item>
      {/* Display 'Profile' as a clickable dropdown item */}
    </LinkContainer> 
    <NavDropdown.Item onClick={logoutHandler}>
      {/* Display 'Logout' as a clickable dropdown item */}
      Logout    
    </NavDropdown.Item>
  </NavDropdown>
) : ( // If userInfo is falsy (i.e., user is not logged in)
  <LinkContainer to='/login'>
    {/* Create a LinkContainer that wraps the 'Sign In' navigation item */}
    {/* Sign In link */}
    <Nav.Link href="/login">
      {/* Create a clickable navigation link */}
      {/* User icon */}
      <FaUser style={{ color: 'white' }}/> Sign In
      {/* Display a user icon followed by 'Sign In' text */}
    </Nav.Link>
  </LinkContainer>
)}

  {userInfo && userInfo.isAdmin && ( 
    <NavDropdown title="Admin" id="adminmenu">  
     
      <LinkContainer to="/admin/productlist"> 
        <NavDropdown.Item>Product</NavDropdown.Item>
      </LinkContainer> 
      <LinkContainer to="/admin/userlist"> 
        <NavDropdown.Item>User</NavDropdown.Item> 
      </LinkContainer>  
   <LinkContainer to="/admin/orderlist">  
        <NavDropdown.Item>Orders</NavDropdown.Item>  
      </LinkContainer>  
   
    </NavDropdown>  
  ) 
  }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header; // Export the Header component as the default export
