import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    preferences: "",
  });
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedCustomer, setSelectedCustomer] = useState(null); 

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


  // Load data from API on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/orders");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Handler to create a new customer
  const handleCreateCustomer = async () => {
    const newCustomer = { ...customerDetails, customerId: customers.length + 1 };

    try {
      const response = await fetch("http://localhost:5000/api/dashboard/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        setCustomers([...customers, newCustomer]);  // Add the new customer to the customers list
        setCustomerDetails({
          customerName: "",
          email: "",
          phone: "",
          deliveryDetails: "",
        });
        alert("Customer created successfully!");
      } else {
        console.error("Failed to create customer");
        alert("Failed to create customer. Please try again.");
      }
    } catch (error) {
      console.error("Error creating customer:", error);
      alert("Error creating customer. Please try again.");
    }
  };
  


  return (
    <div className="container">
      <NavBar />
      <div className="container custom-margins" style={{ marginTop: "150px" }}>
        <h2 className="text-center">Customer Management</h2>

        <div className="row">
          {/* Create New Customer Section */}
          <div className="col-md-6">
            <div className="my-4">
              <h4>Create New Customer</h4>
              <form>
                <div className="mb-3">
                  <label className="form-label">Customer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerDetails.customerName}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, customerName: e.target.value })
                    }
                    placeholder="Enter customer name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={customerDetails.email}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, email: e.target.value })
                    }
                    placeholder="Enter email address"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={customerDetails.phone}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Delivery Details</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerDetails.deliveryDetails}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, deliveryDetails: e.target.value })
                    }
                    placeholder="Enter delivery details"
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateCustomer}
                >
                  Create Customer
                </button>
              </form>
            </div>
          </div>
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
                {/* <tbody>
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
                          onClick={() => handleNavigate(order)}
                        >
                          Generate Bill
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
