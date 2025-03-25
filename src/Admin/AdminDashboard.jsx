import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Nav"; // Custom NavBar component
import Sidebar from "./Sidebar"; // Custom Sidebar component

const AdminDashboard = () => {
  return (
    <div className="d-flex" >
      Sidebar
      <Sidebar />
      <div className="flex-grow-1">
        <Nav />
        <div className="container" style={{  width: '1000px', marginLeft: '300px', marginTop: '50px'}}>
          <h2 className="text-center">Admin Dashboard</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="my-4">
            
              </div>
            </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
