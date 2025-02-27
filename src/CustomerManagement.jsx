import React, { useState } from "react";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    preferences: "",
  });
  const [orderHistory, setOrderHistory] = useState({});

  const [editCustomerId, setEditCustomerId] = useState(null);

  // Sample order history (could be fetched from a database)
  const sampleOrderHistory = {
    1: [
      { orderId: "1001", product: "Iron Rods", quantity: "50", status: "Completed" },
      { orderId: "1002", product: "Cement Bags", quantity: "100", status: "Shipped" },
    ],
    2: [
      { orderId: "1003", product: "Steel Bars", quantity: "30", status: "Pending" },
    ],
  };

  // Handle Add or Edit Customer
  const handleSaveCustomer = () => {
    if (editCustomerId !== null) {
      const updatedCustomers = customers.map((customer) =>
        customer.id === editCustomerId ? { ...customer, ...customerDetails } : customer
      );
      setCustomers(updatedCustomers);
      setEditCustomerId(null); // Reset edit mode
    } else {
      const newCustomer = {
        ...customerDetails,
        id: customers.length + 1,
      };
      setCustomers([...customers, newCustomer]);
    }

    // Reset form
    setCustomerDetails({
      name: "",
      email: "",
      phone: "",
      preferences: "",
    });
  };

  // Handle Delete Customer
  const handleDeleteCustomer = (id) => {
    const filteredCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(filteredCustomers);
  };

  // Handle View Order History
  const handleViewOrderHistory = (id) => {
    setOrderHistory(sampleOrderHistory[id] || []);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Customer Management</h2>

      {/* Customer Form to Add or Edit Customer */}
      <div className="my-4">
        <h4>{editCustomerId ? "Edit Customer" : "Add New Customer"}</h4>
        <form>
          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
              placeholder="Enter customer name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={customerDetails.email}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, email: e.target.value })
              }
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={customerDetails.phone}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, phone: e.target.value })
              }
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Preferences</label>
            <input
              type="text"
              className="form-control"
              value={customerDetails.preferences}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, preferences: e.target.value })
              }
              placeholder="Enter customer preferences"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveCustomer}
          >
            {editCustomerId ? "Update Customer" : "Add Customer"}
          </button>
        </form>
      </div>

      {/* Customers List */}
      <div className="my-4">
        <h4>Customers List</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Preferences</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.preferences}</td>
                <td>
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => {
                      setCustomerDetails(customer);
                      setEditCustomerId(customer.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info mx-2"
                    onClick={() => handleViewOrderHistory(customer.id)}
                  >
                    View Order History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order History Modal/Section */}
      <div className="my-4">
        {orderHistory.length > 0 && (
          <>
            <h4>Order History</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;
