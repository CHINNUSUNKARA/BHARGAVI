import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import OrderSection from "./OrderPage";
import SupplierManagement from "./SupplierManagement";
import CustomerManagement from "./CustomerManagement";
import Reports from "./Reports";
import InvoiceManagement from "./InvoiceManagement";
import NavBar from "./NavBar";

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


  return (
    <div>
      {<NavBar />}
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
    </div>
  );
};

export default HomePage;
