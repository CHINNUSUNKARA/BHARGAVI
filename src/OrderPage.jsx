import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

const OrderPage = () => {
  const [customers, setCustomers] = useState([]); // Stores customers fetched from the API
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Stores the selected customer
  const [orderDetails, setOrderDetails] = useState({
    itemName: "",
    itemBrand: "",  // Ensure itemBrand is included here
    itemQuantity: "",
    itemPrice: "",
    dateOfOrder: "",
  });
  const [items, setItems] = useState({
    iron: [],
    cement: {},
    pipes: {},
    sheets: {},
  });
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for selected category
  const [orders, setOrders] = useState([]); // New state for orders

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

  // Fetch item data dynamically based on selected category
  useEffect(() => {
    const fetchItems = async () => {
      if (selectedCategory) {
        try {
          const response = await fetch(`http://localhost:5000/api/dashboard/items/${selectedCategory}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          setItems((prevItems) => ({ ...prevItems, [selectedCategory]: data })); // Update the selected category's data
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      }
    };

    fetchItems();
  }, [selectedCategory]); // Trigger when selectedCategory changes

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
  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer); // Set selected customer
  };

  // Handle change in order details fields
  const handleOrderChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value, // Update the specific field in the order details
    });
  };

  // Handle item name change and dynamically set item price and brand
  const handleItemNameChange = (e) => {
    const selectedItem = e.target.value;
    let price = "";
    let brand = ""; // Variable to hold item brand

    if (selectedCategory === "iron") {
      const item = items.iron.find((ironItem) => ironItem.size === selectedItem);
      price = item ? item.price : "";
      brand = item ? item.brand : ""; // Assuming items have a `brand` property
    } else if (selectedCategory === "cement") {
      const item = items.cement[selectedItem];
      price = item ? item.price : "";
      brand = selectedItem; // In case of cement, brand is the name of the selected item
    } else if (selectedCategory === "pipes") {
      const item = items.pipes[selectedItem];
      price = item ? item.price : "";
      brand = selectedItem; // In case of pipes, brand is the name of the selected item
    } else if (selectedCategory === "sheets") {
      const item = items.sheets[selectedItem];
      price = item ? item.price : "";
      brand = selectedItem; // In case of sheets, brand is the name of the selected item
    }

    setOrderDetails({
      ...orderDetails,
      itemName: selectedItem,
      itemPrice: price, // Dynamically set the item price
      itemBrand: brand, // Dynamically set the item brand
    });
  };

  // Collect order data
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Collect order data
    const orderData = {
      customerName: selectedCustomer.name, // Ensure customerId is set from the selected customer
      itemName: orderDetails.itemName,
      itemBrand: orderDetails.itemBrand, // Ensure itemBrand is included in the order data
      itemQuantity: orderDetails.itemQuantity,
      itemPrice: orderDetails.itemPrice,
      dateOfOrder: orderDetails.dateOfOrder,
    };

    try {
      // Send POST request to API to save the order
      const response = await fetch("http://localhost:5000/api/dashboard/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData), // Send the order data as JSON
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order created successfully!"); // Handle success
        setOrderDetails({ itemName: "", itemBrand: "", itemQuantity: "", itemPrice: "", dateOfOrder: "" }); // Clear form
        setOrders([...orders, data]); // Add the new order to the orders list
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while submitting the order.");
    }
  };

  const handleModifyOrder = (order) => {
    // Modify the order details 
    setOrderDetails({
      itemName: order.itemName,
      itemBrand: order.itemBrand, // Ensure itemBrand is included here
      itemQuantity: order.itemQuantity,
      itemPrice: order.itemPrice,
      dateOfOrder: order.dateOfOrder,
    });
  };

  return (
    <div className="container">
      <NavBar />
      <div className="container custom-margins" style={{ marginTop: "150px" }}>
        <h2 className="text-center">Order Management</h2>

        <div className="row">
          <div className="col-md-6">
            <div className="my-4">
              <h4>Select a Customer</h4>
              <select
                className="form-control"
                onChange={(e) => {
                  const selected = customers.find((customer) => customer.id === e.target.value);
                  handleCustomerSelect(selected);
                }}
                value={selectedCustomer ? selectedCustomer.id : ""}
              >
                <option value="">--Select a Customer--</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Orders List Section */}
            <div className="row">
              <h4>Recent Orders</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Date of Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.customerName}</td>
                      <td>{order.itemName}</td>
                      <td>{order.itemPrice}</td>
                      <td>{order.dateOfOrder}</td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => handleModifyOrder(order)}>
                          Modify
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-6">
            {/* Order Details Section */}
            <div className="col-md-6">
              {selectedCustomer && (
                <div className="my-6">
                  <h4>Order Details</h4>
                  <form onSubmit={handleSubmit}> {/* Handle form submission */}
                    <div className="mb-6">
                      <label className="form-label">Customer Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedCustomer.name}
                        disabled
                      />
                    </div>

                    {/* Item Category Selection */}
                    <div className="mb-3">
                      <label className="form-label">Item Category</label>
                      <select
                        className="form-control"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="">--Select Item Category--</option>
                        <option value="iron">Iron</option>
                        <option value="cement">Cement</option>
                        <option value="pipes">Pipes</option>
                        <option value="sheets">Sheets</option>
                      </select>
                    </div>

                    {/* Item Name Selection */}
                    {selectedCategory && (
                      <div className="mb-3">
                        <label className="form-label">Item Name</label>
                        <select
                          className="form-control"
                          name="itemName"
                          value={orderDetails.itemName}
                          onChange={handleItemNameChange}
                        >
                          <option value="">--Select an Item--</option>

                          {/* Dynamically populate options based on the selected category */}
                          {selectedCategory === "iron" &&
                            items.iron.map((item, index) => (
                              <option key={index} value={item.size}>
                                Iron {item.size}
                              </option>
                            ))}
                          {selectedCategory === "cement" &&
                            Object.keys(items.cement).map((brand) => (
                              <option key={brand} value={brand}>
                                Cement {brand}
                              </option>
                            ))}
                          {selectedCategory === "pipes" &&
                            Object.keys(items.pipes).map((pipeType) => (
                              <option key={pipeType} value={pipeType}>
                                Pipes {pipeType}
                              </option>
                            ))}
                          {selectedCategory === "sheets" &&
                            Object.keys(items.sheets).map((sheetType) => (
                              <option key={sheetType} value={sheetType}>
                                Sheets {sheetType}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                    
                    {/* Item Price Section */}
                    <div className="mb-3">
                      <label className="form-label">Item Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="itemPrice"
                        value={orderDetails.itemPrice}
                        onChange={handleOrderChange}
                        placeholder="Enter item price"
                        disabled
                      />
                    </div>

                    {/* Other Order Details */}
                    <div className="">
                      <label className="form-label">Item Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        name="itemQuantity"
                        value={orderDetails.itemQuantity}
                        onChange={handleOrderChange}
                        placeholder="Enter item quantity"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Date of Order</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dateOfOrder"
                        value={orderDetails.dateOfOrder}
                        onChange={handleOrderChange}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Create Order
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
