import React, { useState } from "react";

const OrderSection = () => {
  // States to hold orders and form inputs
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    productName: "",
    quantity: 1,
    status: "pending",
    deliveryDetails: "",
  });

  const [orderHistory, setOrderHistory] = useState([]);

  // Handler to create a new order
  const handleCreateOrder = () => {
    const newOrder = { ...orderDetails, orderId: orders.length + 1 };
    setOrders([...orders, newOrder]);
    setOrderHistory([...orderHistory, newOrder]);
    setOrderDetails({
      customerName: "",
      productName: "",
      quantity: 1,
      status: "pending",
      deliveryDetails: "",
    });
    alert("Order created successfully!");
  };

  // Handler to update order status
  const handleUpdateOrderStatus = (orderId, status) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    setOrderHistory(updatedOrders);
  };

  // Handler to assign delivery details
  const handleAssignDeliveryDetails = (orderId, details) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, deliveryDetails: details } : order
    );
    setOrders(updatedOrders);
    setOrderHistory(updatedOrders);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Order Management</h2>

      {/* Order Form to Create New Order */}
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
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={orderDetails.productName}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, productName: e.target.value })
              }
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={orderDetails.quantity}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, quantity: e.target.value })
              }
              min="1"
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

      {/* Orders History */}
      <div className="my-4">
        <h4>Order History</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Delivery Details</th>
              <th>Update Status</th>
              <th>Assign Delivery Details</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
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
                    className="btn btn-info"
                    onClick={() =>
                      handleAssignDeliveryDetails(order.orderId, "New delivery details")
                    }
                  >
                    Assign Delivery
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderSection;
