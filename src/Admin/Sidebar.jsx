import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        position: "fixed",
        height: "100vh",
        zIndex: "1",
      }}
    >
      <h4>Admin Panel</h4>
      <Nav className="flex-column mt-3">
        {/* Home Link */}
        <Nav.Link as={Link} to="/AdminPage" className="text-white">
          <i className="bi bi-house-door"></i> Home
        </Nav.Link>

        {/* Users Link */}
        <Nav.Link as={Link} to="/AdminCustomer" className="text-white">
          <i className="bi bi-person"></i> Users
        </Nav.Link>

        {/* Inventory Link */}
        <Nav.Link as={Link} to="/AdminInventory" className="text-white">
          <i className="bi bi-box"></i> Inventory
        </Nav.Link>

        {/* Item Price Link */}
        <Nav.Link as={Link} to="/AdminPrice" className="text-white">
          <i className="bi bi-cash"></i> Item Price
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
