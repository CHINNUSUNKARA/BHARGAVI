import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Nav from '../Nav'
const Price = () => {
   // State variables for items, brands, categories, and selections
   const [price, setPrice] = useState(0);
   const [items, setItems] = useState([]);
   const [brands, setBrands] = useState([]);
   const [categories, setCategories] = useState([]);
   const [selectedItem, setSelectedItem] = useState("");
   const [selectedBrand, setSelectedBrand] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("");
 
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
 
   // Fetch brands
   useEffect(() => {
     if (selectedItem) {
      const fetchBrands = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/dashboard/items/name/${selectedItem}/brands`
          );
          const data = await response.json();
      
          if (response.ok && Array.isArray(data)) {
            setBrands(data); // Update state with fetched brands
          } else {
            console.error("API Error:", data);
            setBrands([]); // Reset brands if there's an error
          }
        } catch (error) {
          console.error("Error fetching brands:", error);
          setBrands([]); // Reset brands in case of an error
        }
      };
       fetchBrands();
       
     } else {
       setBrands([]);
     }
   }, [selectedItem]);
 
   // Fetch categories
   useEffect(() => {
     if (selectedBrand) {
       const fetchCategories = async () => {
         try {
           const response = await fetch(
             `http://localhost:5000/api/dashboard/items/name/${selectedItem}/brands/${selectedBrand}/categories`
           );
           const data = await response.json();
           setCategories(data);
         } catch (error) {
           console.error("Error fetching categories:", error);
         }
       };
       fetchCategories();
     } else {
       setCategories([]);
     }
   }, [selectedBrand]);

  return (
    <div>
      <Sidebar /> <Nav />
      <h1 className='text-center mt-3'>Price</h1>

      <div
        className="container mt-4 p-4 border border-dark rounded shadow bg-light"
        style={{ width: '1000px', marginLeft: '300px' }}>
            <section className="content-header">
              <div className="container-fluid">
                {/* Select Item */}
            <div className="mb-3">
              <label htmlFor="item" className="form-label">Select Item</label>
              <select
                id="item"
                className="form-control"
                onChange={(e) => setSelectedItem(e.target.value)}
                value={selectedItem}
              >
                <option value="">--Select an Item--</option>
                {items.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Brand */}
            <div className="mb-3">
          <label htmlFor="brand" className="form-label">Select Brand</label>
          <select
            id="brand"
            className="form-control"
            onChange={(e) => setSelectedBrand(e.target.value)}
            value={selectedBrand}
            disabled={!selectedItem}
              >
                <option value="">--Select a Brand--</option>
                {Array.isArray(brands) && brands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}  
                  </option>
                ))}
              </select>
            </div>

            {/* Select Category */}
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Select Category</label>
              <select
                id="category"
                className="form-control"
                disabled={!selectedBrand} // Disable if no brand is selected
              >
                <option value="">--Select a Category--</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                id="price"
                className="form-control"
                value={price} // price state variable
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value) && value >= 0) {
                    setPrice(value); // Ensure only valid numeric values
                  }
                }}
                min="0" // Minimum value for price
                step="0.01" // Precision for two decimal places
                required
              />
            </div>
          </div>
          
        </div>
        </section>
      </div>
    </div>
  )
}

export default Price