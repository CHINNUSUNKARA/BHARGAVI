import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    console.log('Logout clicked');
    // Add your logout logic here, such as clearing tokens, etc.
    alert('Logged out successfully!');
    navigate('/'); // Navigate to the login page after logout
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg- fixed-top custom-navbar">
  <div className="container d-flex justify-content-between align-items-center">
    {/* Logo */}
    <img src="/" alt="logo" className="navbar-logo" />

    {/* Social Media Icons */}
    <div className="social-icons text-center">
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-dark mx-2"
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-dark mx-2"
      >
        <i className="fab fa-facebook"></i>
      </a>
      <a
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-dark mx-2"
      >
        <i className="fab fa-twitter"></i>
      </a>
    </div>

    {/* Logout Button */}
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  </div>
</nav>


      {/* Sidebar */}
      <div
        className=" text-white p-3"
        style={{
          backgroundColor: "#88add2",/* Light gray background color */
          width: '250px',
          position: 'fixed',
          height: '100vh',
          zIndex: '1',
          top: '0',
          left: '0',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Logout Button in Sidebar */}
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="mt-3">
          <ul className="list-unstyled text-white  d-flex flex-column gap-3 fs-5   ">
            <li>
              <Link className="nav-link text-white" to="/homePage">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link text-white" to="/Customer">
                Customer
              </Link>
            </li>
            <li>
              <Link className="nav-link text-white" to="/OrderPage">
                Orders
              </Link>
            </li>
            <li>
              <Link className="nav-link text-white" to="/Supplier">
                Supplier
              </Link>
            </li>
            <li>
              <Link className="nav-link text-white" to="/Invoice">
                Bill'S
              </Link>
            </li>
            <li>
              <Link className="nav-link text-white" to="/StockAdd">
                Stock ADD
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
