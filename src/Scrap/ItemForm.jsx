import React, { useState } from 'react';
import NavBar from '../NavBar';

const ItemAdd = () => {
  const [iron, setIron] = useState([]);
  const [cement, setCement] = useState([]);
  const [pipes, setPipes] = useState([]);
  const [sheets, setSheets] = useState([]);

  // Function to handle changes in Iron field
  const handleIronChange = (e, index) => {
    const newIron = [...iron];
    newIron[index] = { size: e.target.value, price: 100 }; // Example price
    setIron(newIron);
  };

  // Function to handle changes in Cement field
  const handleCementChange = (e, index) => {
    const newCement = [...cement];
    newCement[index] = { brand: e.target.value, quantity: 50, price: 200 }; // Example price and quantity
    setCement(newCement);
  };

  // Function to handle changes in Pipes field
  const handlePipesChange = (e, index) => {
    const newPipes = [...pipes];
    newPipes[index] = { type: e.target.value, length: 20, price: 150 }; // Example length and price
    setPipes(newPipes);
  };

  // Function to handle changes in Sheets field
  const handleSheetsChange = (e, index) => {
    const newSheets = [...sheets];
    newSheets[index] = { brand: e.target.value, size: '4x8', price: 250 }; // Example size and price
    setSheets(newSheets);
  };

  // Function to handle submit and push data to server
  const handleSubmit = async () => {
    const itemData = {
      iron,
      cement,
      pipes,
      sheets,
    };

    try {
      const response = await fetch('http://localhost:5000/api/dashboard/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Items added successfully!');
        console.log(data);
      } else {
        alert('Failed to add items');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="container custom-margins" style={{ marginTop: "150px" }}>
      <h3 className="text-center">Add Items</h3>
      
      {/* Iron Section */}
      <div className="mb-4">
        <h4>Iron</h4>
        {iron.map((item, index) => (
          <div key={index} className="mb-2">    
            <input
              type="text"
              className="form-control"
              placeholder="Enter Iron Size (e.g., 20mm)"
              value={item.size}
              onChange={(e) => handleIronChange(e, index)}
            />
          </div>
        ))}
        <button className="btn btn-secondary" onClick={() => setIron([...iron, { size: '', price: 100 }])}>Add Iron Size</button>
      </div>

      {/* Cement Section */}
      <div className="mb-4">
        <h4>Cement</h4>
        {cement.map((item, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Cement Brand (e.g., Nagarjuna)"
              value={item.brand}
              onChange={(e) => handleCementChange(e, index)}
            />
          </div>
        ))}
        <button className="btn btn-secondary" onClick={() => setCement([...cement, { brand: '', quantity: 50, price: 200 }])}>Add Cement Brand</button>
      </div>

      {/* Pipes Section */}
      <div className="mb-4">
        <h4>Pipes</h4>
        {pipes.map((item, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Pipe Type (e.g., GP Kalai)"
              value={item.type}
              onChange={(e) => handlePipesChange(e, index)}
            />
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Enter Length (in feet)"
              value={item.length}
              onChange={(e) => handlePipesChange(e, index)}
            />
          </div>
        ))}
        <button className="btn btn-secondary" onClick={() => setPipes([...pipes, { type: '', length: 20, price: 150 }])}>Add Pipe</button>
      </div>

      {/* Sheets Section */}
      <div className="mb-4">
        <h4>Sheets</h4>
        {sheets.map((item, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Sheet Brand (e.g., JSW)"
              value={item.brand}
              onChange={(e) => handleSheetsChange(e, index)}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter Sheet Size (e.g., 4x8)"
              value={item.size}
              onChange={(e) => handleSheetsChange(e, index)}
            />
          </div>
        ))}
        <button className="btn btn-secondary" onClick={() => setSheets([...sheets, { brand: '', size: '4x8', price: 250 }])}>Add Sheet</button>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
      </div>
    </div>
  );
};

export default ItemAdd;
