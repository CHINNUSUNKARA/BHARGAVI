import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

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
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedCustomer, setSelectedCustomer] = useState(null); 

  const sampleOrderHistory = {
    1: [
      { orderId: "1001", product: "Iron Rods", quantity: "50", status: "Completed" },
      { orderId: "1002", product: "Cement Bags", quantity: "100", status: "Shipped" },
    ],
    2: [
      { orderId: "1003", product: "Steel Bars", quantity: "30", status: "Pending" },
    ],
  };

  // Load customers from localStorage on component mount
  useEffect(() => {
    const savedCustomers = localStorage.getItem("customers");
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
  }, []);

  // Save customers to localStorage whenever the list changes
  useEffect(() => {
    if (customers.length > 0) {
      localStorage.setItem("customers", JSON.stringify(customers));
    }
  }, [customers]);

  const handleSaveCustomer = () => {
    if (editCustomerId !== null) {
      const updatedCustomers = customers.map((customer) =>
        customer.id === editCustomerId ? { ...customer, ...customerDetails } : customer
      );
      setCustomers(updatedCustomers);
      setEditCustomerId(null);
    } else {
      const newCustomer = {
        ...customerDetails,
        id: customers.length + 1,
      };
      setCustomers([...customers, newCustomer]);
    }

    setCustomerDetails({
      name: "",
      email: "",
      phone: "",
      preferences: "",
    });
  };

  const handleDeleteCustomer = (id) => {
    const filteredCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(filteredCustomers);
    setIsModalOpen(false); 
  };

  const handleViewOrderHistory = (id) => {
    setOrderHistory(sampleOrderHistory[id] || []);
  };

  const openModal = (customer) => {
    setSelectedCustomer(customer); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div>
      <NavBar />
      <div className="container custom-margins" style={{ marginTop: "150px" }}>
        <h2 className="text-center">Customer Management</h2>

        <div className="row">
          <div className="col-md-6">
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
          </div>

          <div className="col-md-6">
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
                          className="btn btn-warning"
                          onClick={() => openModal(customer)} 
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

        {isModalOpen && selectedCustomer && (
          <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="customerModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="customerModalLabel">Customer Details</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Name:</strong> {selectedCustomer.name}</p>
                  <p><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                  <p><strong>Preferences:</strong> {selectedCustomer.preferences}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setCustomerDetails(selectedCustomer);
                      setEditCustomerId(selectedCustomer.id);
                      closeModal();
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;
