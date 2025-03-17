import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import NavBar from "./NavBar";
import StockInventory from "./StockInventory";

const HomePage = () => {
  

  // const heroImages = [
  //   "/assets/images/hero/hero (1).png",
  //   "/assets/images/hero/hero (5).png",
  //   "/assets/images/hero/hero (6).png",
  //   "/assets/images/hero/hero (7).png",
  //   "/assets/images/hero/hero.png"
  // ];

  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000, // 2 seconds
  // };



  return (
    <div>
      {<NavBar />}
      {/* Hero Section */}
      {/* <section className="hero custom-margins">
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
</section> */}
    <div>
      {<StockInventory/>}
    </div>
    </div>
  );
};

export default HomePage;
