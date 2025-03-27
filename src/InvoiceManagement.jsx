import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

const InvoiceManagement = () => {
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/orders");
        const data = await response.json();
        setFilteredOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Placeholder function for Modify button
  const openModal = (order) => {
    console.log("Modify order:", order);
  };

  return (
    <div>
      <NavBar />
      <div
        className="container custom-margins"
        style={{
          marginTop: "70px",
          marginLeft: "250px",
          padding: "20px",
          width: "auto",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <h1 className="text-center">Bill Generation</h1>
        <div className="container">
          <div className="col-md-12">
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Order Item</th>
                  <th>Order Brand</th>
                  <th>Order Category</th>
                  <th>Order Quantity</th>
                  <th>Order Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id || order._id}>
                    <td>{order.id || order._id}</td>
                    <td>{order.item}</td>
                    <td>{order.brand}</td>
                    <td>{order.category}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => openModal(order)}
                      >
                        Modify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceManagement;
