import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { toast } from 'react-toastify'; // Toast for better feedback
import 'react-toastify/dist/ReactToastify.css';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]); // Store customers
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Store filtered (searched) customers
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editCustomerId, setEditCustomerId] = useState(null); // Initialize as null to indicate no editing by default
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch customers from API on initial load
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/customers");
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);
  useEffect(() => {
    // Filter customers based on the search term
    if (searchTerm) {
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
       || customer.surname.toLowerCase().includes(searchTerm.toLowerCase()) 
       || customer.email.toLowerCase().includes(searchTerm.toLowerCase()) 
       || customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) 
       || customer.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]); // Hide unfiltered customers if no search term
    }
  }, [searchTerm, customers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    
  };

  // Open the modal to edit the customer
  const openModal = (customer) => {
    setSelectedCustomer(customer); // Store the selected customer for reference
    setCustomerDetails({
      name: customer.name,
      surname: customer.surname,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    }); // Set form fields with the selected customer's data
    setEditCustomerId(customer._id); // Set the edit ID to know that it's an update
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
    setCustomerDetails({
      name: "",
      surname: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const handleSaveCustomer = async () => {
    const newCustomer = { ...customerDetails };
  
    try {
      // Define the method and URL based on whether we're editing or adding a new customer
      const method = editCustomerId ? "PUT" : "POST";
      const url = editCustomerId
        ? `http://localhost:5000/api/dashboard/customers/${editCustomerId}`
        : "http://localhost:5000/api/dashboard/customers";
  
      console.log("Saving customer:", newCustomer); // Log the customer details
      console.log("API URL:", url); // Log the API URL
      console.log("Method:", method); // Log the method
  
      // Make the API request
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer), // Ensure you're stringifying the data
      });
  
      console.log("Response status:", response.status); // Log the response status
  
      if (response.ok) {
        const updatedCustomer = await response.json(); // Get the customer from the response
        console.log("Updated customer:", updatedCustomer); // Log the updated customer
  
        // If we're editing, update the customer list locally
        if (editCustomerId) {
          const updatedCustomers = customers.map((customer) =>
            customer._id === editCustomerId ? updatedCustomer : customer
          );
          setCustomers(updatedCustomers);
        } else {
          // Otherwise, add the new customer to the list
          setCustomers((prevCustomers) => [...prevCustomers, updatedCustomer]);
        }
  
        alert("Customer saved successfully!");
  
        // Reset the form and the edit state
        setCustomerDetails({
          name: "",
          surname:"",
          email: "",
          phone: "",
          address: "",
        });
        setEditCustomerId(null);
      } else {
        const errorText = await response.text(); // Get the error text from the response
        console.error("Error saving customer:", errorText); // Log the error text
        alert("Error saving customer!");
      }
    } catch (error) {
      console.error("Error saving customer:", error);
      alert("Failed to save customer.");
    }
  };

  // Handle deleting the customer details
  const handleDeleteCustomer = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dashboard/customers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const filteredCustomers = customers.filter((customer) => customer._id !== id); // Use _id for filtering
        setCustomers(filteredCustomers); // Update customer list after deletion
        setIsModalOpen(false);
        alert("Customer deleted successfully.");
      } else {
        alert("Error deleting customer.");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container custom-margins" style={{  marginTop: "70px", marginLeft: '250px', padding: '20px', width: 'auto', overflow: 'hidden', height: '100vh' }}>
        <h2 className="text-center">Customer Management</h2>

        <div className="row">
          <div className="col-md-4">
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
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Customer Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerDetails.surname}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, surname: e.target.value })
                    }
                    placeholder="Enter customer Surname"
                    required
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
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerDetails.phone}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerDetails.address}
                    onChange={(e) =>
                      setCustomerDetails({ ...customerDetails, address: e.target.value })
                    }
                    placeholder="Enter address"
                    required
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

          <div className="col-md-8">
            <div className="my-4">
              <h4 >Search Customers</h4>
              <input
                  type="text"
                  placeholder="Search customers"
                  className="form-control"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <table className="table table-bordered mt-4">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer._id}> {/* Use _id instead of id */}
                        <td>{customer.name + " " + customer.surname}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
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
              
              {filteredCustomers.length === 0 && searchTerm && (
                <p>No customers found with that name.</p>
              )}
            </div>
          </div>
        </div>

        {isModalOpen && selectedCustomer && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="customerModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="customerModalLabel">
                    Customer Details
                  </h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Name:</strong> {selectedCustomer.name}</p>
                  <p><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                  <p><strong>Address:</strong> {selectedCustomer.address}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteCustomer(selectedCustomer._id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      // Populate form fields with the selected customer's data
                      setCustomerDetails({
                        name: selectedCustomer.name,
                        email: selectedCustomer.email,
                        phone: selectedCustomer.phone,
                        address: selectedCustomer.address,
                      });
                      setEditCustomerId(selectedCustomer._id); // Set the ID for the editing state
                      setIsModalOpen(false); // Close the modal after setting the customer for editing
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
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
