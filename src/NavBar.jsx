import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()
    
    const handleLogout = () => {
        console.log("Logout clicked");
        // Add your logout logic here, e.g., clearing tokens, etc.
        alert("Logged out successfully!");
        navigate("/"); // Navigate to the login page
      };
    
  return (
    <div>
        {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Brand Name */}
          <Link className="navbar-brand" to="/">
            My App
          </Link>

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

      {/* Second Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ top: '55px' }}>
        <div className="container">
          <p className="navbar-brand">
            Iron & Cement Trade
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
              <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/homePage">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/OrderPage">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Supplier">
                Supplier 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Customer">
                  Customer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Invoice">
                  Bill'S
                </Link>
                </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Reports">
                  Reports
                </Link>
              </li>
          </ul>
        </div>
        </div>
      </nav>

    </div>
  )
}

export default NavBar