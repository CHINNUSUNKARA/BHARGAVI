import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();
  
  // States to hold orders and form inputs
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    Email: "",
    Phone: "",
    status: "pending",
    deliveryDetails: "",
  });

  const [orderHistory, setOrderHistory] = useState([]);

  // Load data from API on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/orders");
        const data = await response.json();
        setOrders(data);
        setOrderHistory(data); // Use the same orders for history (if needed, separate logic)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Handler to create a new order
  const handleCreateOrder = async () => {
    const newOrder = { ...orderDetails, orderId: orders.length + 1 };

    try {
      const response = await fetch("http://localhost:5000/api/dashboard/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        const createdOrder = await response.json();
        setOrders([...orders, createdOrder]);
        setOrderDetails({
          customerName: "",
          Email: "",
          Phone: "",
          status: "pending",
          deliveryDetails: "",
        });
        alert("Order created successfully!");
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Handler to update order status
  const handleUpdateOrderStatus = async (orderId, status) => {
    const updatedOrder = { status };

    try {
      const response = await fetch(`http://localhost:5000/api/dashboard/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      if (response.ok) {
        const updatedOrders = orders.map((order) =>
          order.orderId === orderId ? { ...order, status } : order
        );
        setOrders(updatedOrders);
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Handler to generate the bill and navigate to the InvoicePage
  const handleNavigate = () => {
    navigate('/Invoice', { state: { orderDetails } });
  };

  return (
    <div className="container">
      <NavBar />
      <div className="container custom-margins" style={{ marginTop: "150px" }}>
        <h2 className="text-center">Order Management</h2>

        <div className="row">
          {/* Create New Order Section */}
          <div className="col-md-6">
            <div className="my-4">
              <h4>Create New Order</h4>
              <form>
                <div className="mb-3">
                  <label className="form-label">Customer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={orderDetails.customerName}
                    onChange={(e) =>
                      setOrderDetails({ ...orderDetails, customerName: e.target.value })
                    }
                    placeholder="Enter customer name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={orderDetails.Email}
                    onChange={(e) =>
                      setOrderDetails({ ...orderDetails, Email: e.target.value })
                    }
                    placeholder="Enter email address"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={orderDetails.Phone}
                    placeholder="Enter Phone Number"
                    onChange={(e) =>
                      setOrderDetails({ ...orderDetails, Phone: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Delivery Details</label>
                  <input
                    type="text"
                    className="form-control"
                    value={orderDetails.deliveryDetails}
                    onChange={(e) =>
                      setOrderDetails({ ...orderDetails, deliveryDetails: e.target.value })
                    }
                    placeholder="Enter delivery details"
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateOrder}
                >
                  Create Order
                </button>
              </form>
            </div>
          </div>

          {/* Order History Section */}
          <div className="col-md-6">
            <div className="my-4">
              <h4>Order History</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Status</th>
                    <th>Delivery Details</th>
                    <th>Update Status</th>
                    <th>Bill Generation</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td>{order.customerName}</td>
                      <td>{order.status}</td>
                      <td>{order.deliveryDetails}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleUpdateOrderStatus(order.orderId, "shipped")}
                        >
                          Mark as Shipped
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={handleNavigate}
                        >
                          Generate Bill
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
    </div>
  );
};

export default OrderPage;
