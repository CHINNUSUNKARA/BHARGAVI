import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import NavBar from "../Nav";

const Inventory = () => {
  // State variables
  const [brand, setBrand] = useState("");            // Brand to be added
  const [category, setCategory] = useState("");        // Category to be added
  const [items, setItems] = useState([]);              // List of items fetched from the API
  const [error, setError] = useState("");              // Error message
  const [selectedItem, setSelectedItem] = useState(""); // Selected item's id

  // Fetch all items on mount
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

  // Handle item selection from the dropdown
  const handleItemSelect = (selectedId) => {
    setSelectedItem(selectedId);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Make sure all fields are provided
    if (!selectedItem || !brand || !category) {
      setError("Please select an item and fill in both brand and category.");
      return;
    }

    // This payload is used when we're adding a new brand (which includes one category)
    const newBrandPayload = {
      name: brand,
      categories: [{ name: category }]
    };

    try {
      // First, check if the brand already exists by fetching the current brands
      const checkResponse = await fetch(
        `http://localhost:5000/api/dashboard/items/id/${selectedItem}/brands`
      );
      console.log(checkResponse);
    
      if (checkResponse.ok) {
        const brands = await checkResponse.json();
    
        // Check if the brand already exists (case-insensitive)
        const existingBrand = brands.find(b =>
          b.name.toLowerCase() === newBrandPayload.name.toLowerCase()
        );
    
        if (existingBrand) {
          // If the brand exists, add a new category using the addCategory endpoint
          const addCategoryResponse = await fetch(
            `http://localhost:5000/api/dashboard/items/${selectedItem}/brands/${existingBrand._id}/categories`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ name: category })
            }
          );
    
          if (addCategoryResponse.ok) {
            alert("Category added to existing brand successfully!");
          } else {
            const errorData = await addCategoryResponse.json();
            setError(errorData.error || "Failed to add category to brand.");
          }
        } else {
          // If the brand doesn't exist, add a new brand along with the category information
          const response = await fetch(
            `http://localhost:5000/api/dashboard/items/${selectedItem}/brands`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(newBrandPayload)
            }
          );
    
          if (response.ok) {
            alert("Brand & Category added successfully!");
          } else {
            const errorData = await response.json();
            setError(errorData.error || "Failed to add brand.");
          }
        }
    
        // Reset the form fields after successful operation
        setBrand("");
        setCategory("");
      } else {
        setError("Failed to fetch existing brands.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while processing the request.");
    }
  };

  return (
    <>
      <Sidebar />
      <NavBar />
      <div className="container" style={{ width: "1000px", marginLeft: "300px" }}>
        <h2 className="text-center my-4">Add Brand & Category to an Item</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          
          {/* Item Selection */}
          <div className="mb-3">
            <label htmlFor="item" className="form-label">Select Item</label>
            <select
              id="item"
              className="form-control"
              onChange={(e) => handleItemSelect(e.target.value)}
              value={selectedItem}
            >
              <option value="">--Select an Item--</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Input */}
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">Brand</label>
            <input
              type="text"
              id="brand"
              className="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          {/* Category Input */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              id="category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Brand & Category
          </button>
        </form>
      </div>
    </>
  );
};

export default Inventory;
