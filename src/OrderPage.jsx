import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

const OrderPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [orders, setOrders] = useState([]);
  const [quantity, setQuantity] = useState(1);  // Quantity state
  const [total, setTotal] = useState(0);  // Total state for order

  // Fetch customers
  useEffect(() => {
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

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  // Fetch brands based on the selected item
  useEffect(() => {
    if (selectedItem) {
      const fetchBrands = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/dashboard/items/name/${selectedItem}/brands`
          );
          const data = await response.json();
          setBrands(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error fetching brands:", error);
          setBrands([]);
        }
      };
      fetchBrands();
    } else {
      setBrands([]);
    }
  }, [selectedItem]);

  // Fetch categories based on the selected item and brand
  useEffect(() => {
    if (selectedItem && selectedBrand) {
      const fetchCategories = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/dashboard/items/name/${selectedItem}/brands/${selectedBrand}/categories`
          );
          const data = await response.json();
          setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error fetching categories:", error);
          setCategories([]);
        }
      };
      fetchCategories();
    } else {
      setCategories([]);
    }
  }, [selectedItem, selectedBrand]);

  // Fetch price based on selected item, brand, and category
  useEffect(() => {
    if (selectedItem && selectedBrand && selectedCategory) {
      const fetchPrice = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/dashboard/items/name/${selectedItem}/brands/${selectedBrand}/categories/${selectedCategory}/price`
          );
          const data = await response.json();
          setPrice(data.price);  // Assuming the API returns the price object with a "price" field
        } catch (error) {
          console.error("Error fetching price:", error);
          setPrice(null);
        }
      };
      fetchPrice();
    }
  }, [selectedItem, selectedBrand, selectedCategory]);

  // Handle customer selection
  const handleCustomerSelect = (e) => {
    const selected = customers.find(
      (customer) =>
        (customer.id ? customer.id.toString() : customer._id.toString()) === e.target.value
    );
    setSelectedCustomer(selected);
  };

  // Handle item selection
  const handleItemSelect = (e) => {
    setSelectedItem(e.target.value);
    setSelectedBrand(""); // Reset brand selection when a new item is chosen
    setCategories([]); // Reset categories when a new item is chosen
  };

  // Handle brand selection
  const handleBrandSelect = (e) => {
    setSelectedBrand(e.target.value);
    setCategories([]); // Reset categories when a new brand is chosen
  };

  // Handle category selection
  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Calculate the total price based on quantity and price
  const calculateTotal = () => {
    if (price && quantity) {
      setTotal(price * quantity);
    }
  };

  // Handle the order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCustomer && selectedItem && selectedBrand && selectedCategory && price && quantity) {
      const newOrder = {
        customerId: selectedCustomer.id || selectedCustomer._id,
        item: selectedItem,
        brand: selectedBrand,
        category: selectedCategory,
        quantity,
        price,
        total,
      };

      try {
        const response = await fetch('http://localhost:5000/api/dashboard/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrder),
        });
        const data = await response.json();
        setOrders([...orders, data]);  // Add the new order to the orders list
        console.log("Order submitted:", data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      alert("Please fill in all fields before submitting.");
    }
  };

  return (
    <div>
      <NavBar />
      <div
        className="container"
        style={{
          marginTop: "70px",
          marginLeft: "250px",
          padding: "20px",
          width: "auto",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <h2 className="text-center">Order Management</h2>
        <div className="row">
          <div className="col-md-6">
            <h3>Create an Order</h3>
            <div className="my-4">
              {/* Customer dropdown */}
              <label htmlFor="customer">Customer's List</label>
              <select
                className="form-control mb-3"
                id="customer"
                onChange={handleCustomerSelect}
                value={selectedCustomer ? selectedCustomer.id || selectedCustomer._id : ""}
              >
                <option value="">--Select a Customer--</option>
                {customers.map((customer) => (
                  <option key={customer.id ? customer.id : customer._id} value={customer.id ? customer.id : customer._id}>
                    {customer.name} {customer.surname}
                  </option>
                ))}
              </select>

              {/* Item dropdown */}
              <label htmlFor="items">Item's List</label>
              <select
                className="form-control mb-3"
                id="items"
                onChange={handleItemSelect}
                value={selectedItem}
              >
                <option value="">--Select an Item--</option>
                {items.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              {/* Brand dropdown */}
              <label htmlFor="brands">Brand's List</label>
              <select
                className="form-control mb-3"
                id="brands"
                onChange={handleBrandSelect}
                value={selectedBrand}
                disabled={!selectedItem}
              >
                <option value="">--Select a Brand--</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>

              {/* Category dropdown */}
              <label htmlFor="categorys">Category's List</label>
              <select
                className="form-control mb-3"
                id="categorys"
                onChange={handleCategorySelect}
                value={selectedCategory}
                disabled={!selectedBrand}
              >
                <option value="">--Select a Category--</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Quantity input */}
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                className="form-control mb-3"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  calculateTotal();
                }}
                min="1"
              />

              {/* Price input (disabled) */}
              <label htmlFor="price">Price</label>
              <input type="number" id="price" value={price} className="form-control mb-3" disabled />

              {/* Total input */}
              <label htmlFor="total">Total</label>
              <input type="number" id="total" value={total} className="form-control mb-3" disabled />

              {/* Submit button */}
              <button className="btn btn-primary" onClick={handleSubmit}>
                Add Item
              </button>
            </div>
          </div>

          {/* Display Added Items */}
          <div className="col-md-6">
            <h3>Added Items</h3>
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.brand}</td>
                    <td>{order.category}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                    <td>{order.total}</td>
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

export default OrderPage;
