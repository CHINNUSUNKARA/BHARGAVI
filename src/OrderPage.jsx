import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

const OrderPage = () => {
  const [customers, setCustomers] = useState([]); // Stores customers fetched from the API
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Stores the selected customer
  // Fetch customers from the API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/customers");
        const data = await response.json();
        setCustomers(data); // Set customers data from the API
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const [orders, setOrders] = useState([]); // Stores orders fetched from the API
  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/orders");
        const data = await response.json();
        setOrders(data); // Set orders data from the API
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle customer selection
  const handleCustomerSelect = (e) => {
    const selected = customers.find((customer) => customer.id === e.target.value);
    setSelectedCustomer(selected); // Set selected customer
    console.log("Selected customer:", selected); // Log the selected customer
  };

 
  return (
    <div className="container">
      <NavBar />
      <div className="container custom-margins" style={{ marginTop: "70px", marginLeft: '250px', padding: '20px', width: 'auto', overflow: 'hidden', height: '100vh'}}>
        <h2 className="text-center">Order Management</h2>

        <div className="row">
          <div className="container">
            <div className="col-md-4">
              <div className="my-4">
                <h4>Select a Customer</h4>
                <select
                  className="form-control"
                  onChange={handleCustomerSelect}
                  value={selectedCustomer ? selectedCustomer.id : ""}
                >
                  <option value="">--Select a Customer--</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name + " " + customer.surname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;