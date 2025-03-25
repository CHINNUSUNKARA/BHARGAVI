import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      {/* Use d-flex to make the Nav a flex container */}
      <Nav className="d-flex " style={{ width: "100%", justifyContent:'center' ,marginLeft:"900px"}}>
        <NavDropdown 
          title={<FaUserCircle />} 
          id="collasible-nav-dropdown"
          style={{ zIndex: "2" }}
        >
          <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
