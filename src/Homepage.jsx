import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavBar from "./NavBar";

const HomePage = () => {
  


  return (
    <div>
      <div>{<NavBar />}</div>
      <div className="container" style={{
          marginLeft: '250px',
          padding: '20px',
          width: 'auto',
          overflow: 'hidden',
          height: '100vh',
        }}>
      <h1 className="text-center " style={{marginTop:"70px"}}>Stock Report</h1>
      
    </div>
    </div>
  );
};

export default HomePage;
