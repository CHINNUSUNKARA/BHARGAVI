import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import OrderSection from "./OrderSection";
import SupplierManagement from "./SupplierManagement";
import CustomerManagement from "./CustomerManagement";
import Reports from "./Reports";
import InvoiceManagement from "./InvoiceManagement";

const HomePage = () => {
  const stockData = [
    { item: "Iron Rods", quantity: "500 tons", price: "₹50,000/ton" },
    { item: "Cement Bags", quantity: "1,000 bags", price: "₹350/bag" },
    { item: "Steel Bars", quantity: "300 tons", price: "₹55,000/ton" },
    { item: "Concrete Blocks", quantity: "5,000 units", price: "₹75/unit" },
  ];

  const heroImages = [
    "/assets/images/hero/hero (1).png",
    "/assets/images/hero/hero (5).png",
    "/assets/images/hero/hero (6).png",
    "/assets/images/hero/hero (7).png",
    "/assets/images/hero/hero.png"
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 2 seconds
  };

  const navigate = useNavigate(); // Hook for navigation

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
                <a className="nav-link" href="/HomePage">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#Orders">
                  Orders
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero custom-margins">
  <div className="container">
    <Slider {...sliderSettings}>
      {heroImages.map((img, index) => (
        <div key={index}>
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="d-block w-100 rounded"
            style={{ marginTop:"9.5rem", height: "400px", objectFit: "cover" }}
          />
        </div>
      ))}
    </Slider>
  </div>
</section>


      {/* Stock Reports */}
      <section className="stock-reports my-5">
        <div className="container">
          <h2 className="text-center mb-4">Stock Reports</h2>
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.item}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <div id="Orders"><OrderSection /></div>
      <div id="Track"><SupplierManagement /></div>
      <div id="Customers"><CustomerManagement /></div>
      <div id="Reports"><Reports /></div>
      <div id="Invoice"><InvoiceManagement /></div>

    </div>
  );
};

export default HomePage;
