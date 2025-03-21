import React, { useEffect, useState } from "react";

const InvoiceForm = ({
  orderDetails,
  setOrderDetails,
  handleAddItem,
  handleRemoveItem,
  handleGenerateInvoice,
}) => {


  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch customers from the API
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/customers");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on the search term
  const filteredCustomers = customers.filter((customer) => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCustomerSelect = (customer) => {
    setOrderDetails({
      customerName: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
    });
    setSearchTerm(""); // Clear search term after selecting
  };

  return (
    <div className="col-md-4">
      <h4>Order Details</h4>
      <h4>Search Customer</h4>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search customer by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {filteredCustomers.length > 0 && (
        <ul className="list-group">
          {filteredCustomers.map((customer) => (
            <li
              key={customer.id}
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => handleCustomerSelect(customer)}
            >
              {customer.name}
            </li>
          ))}
        </ul>
      )}

      {/* Form for customer details */}
      {orderDetails.customerName && (
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
              value={orderDetails.email}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, email: e.target.value })
              }
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              value={orderDetails.phoneNumber}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, phoneNumber: e.target.value })
              }
              placeholder="Enter phone number"
            />
          </div>

          <button
            type="button"
            className="btn btn-success my-3"
            onClick={handleGenerateInvoice}
          >
            Generate Invoice
          </button>
        </form>
      )}
      <div className="my-4">
        <h4>Order Items</h4>
        {orderDetails.orderItems.map((item, index) => (
          <div key={index} className="mb-3">
            <input
              type="text"
              className="form-control"
              value={item.product}
              onChange={(e) =>
                setOrderDetails({
                  ...orderDetails,
                  orderItems: orderDetails.orderItems.map((i, idx) =>
                    idx === index ? { ...i, product: e.target.value } : i
                  ),
                })
              }
              placeholder="Enter product name"
            />
            <input
              type="number"
              className="form-control my-2"
              value={item.price}
              onChange={(e) =>
                setOrderDetails({
                  ...orderDetails,
                  orderItems: orderDetails.orderItems.map((i, idx) =>
                    idx === index ? { ...i, price: e.target.value } : i
                  ),
                })
              }
              placeholder="Enter price"
            />
            <input
              type="number"
              className="form-control"
              value={item.quantity}
              onChange={(e) => {
                const updatedQuantity = e.target.value;
                setOrderDetails({
                  ...orderDetails,
                  orderItems: orderDetails.orderItems.map((i, idx) =>
                    idx === index ? { ...i, quantity: updatedQuantity } : i
                  ),
                });
              }}
              placeholder="Enter quantity"
            />
            <button
              type="button"
              className="btn btn-danger my-2"
              onClick={() => handleRemoveItem(index)}
            >
              Remove Item
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={handleAddItem}>
          Add Item
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
