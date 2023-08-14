import {Container, Nav, Navbar} from "react-bootstrap"
import {FaUser, faShoppingCart} from "react-icons/fa"

import React from 'react'
import logo from "../assets/steno_logo.jpg"

const Header = () => {
  return (
    <header>
<Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
<Container>
    <Navbar.Brand href="/">StenoShop</Navbar.Brand>
    <img src={logo} alt='stenoShop' className="stenoLogo"/>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    
    <Navbar.Collapse id="basic-navbar-nav">
    <nav className="ms-auto">
        <Nav.Link href="/cart"><faShoppingCart style={{ color: 'white' }}/></Nav.Link>
        <Nav.Link href="/cart"><FaUser style={{ color: 'white' }}/></Nav.Link>
    </nav>
    

    </Navbar.Collapse>
</Container>

</Navbar>

    </header>
  )
}

export default Header
