// import React, { useState } from "react";

// const ItemAdd = () => {
//   // State to hold form input values
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [brand, setBrand] = useState("");
//   const [category, setCategory] = useState(""); // e.g., iron, cement, etc.
//   const [message, setMessage] = useState(""); // For showing success or error messages

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare the data to send
//     const newItem = {
//       name,
//       price,
//       brand,
//       category,
//     };

//     try {
//       // Send POST request to the backend to add the item
//       const response = await fetch(`http://localhost:5000/api/dashboard/items/${category}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newItem), // Send the new item as a JSON string
//       });

//       if (response.ok) {
//         setMessage("Item added successfully!");
//         // Optionally, reset the form fields after successful submission
//         setName("");
//         setPrice("");
//         setBrand("");
//         setCategory("");
//       } else {
//         setMessage("Failed to add item. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error adding item:", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="text-center my-4">Add New Item</h2>

//       {/* Display message if any */}
//       {message && <p>{message}</p>}

//       {/* Item Add Form */}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Item Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="price" className="form-label">
//             Price
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             id="price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="brand" className="form-label">
//             Brand
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="brand"
//             value={brand}
//             onChange={(e) => setBrand(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="category" className="form-label">
//             Category
//           </label>
//           <select
//             className="form-control"
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="iron">Iron</option>
//             <option value="cement">Cement</option>
//             <option value="pipes">Pipes</option>
//             <option value="sheets">Sheets</option>
//           </select>
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Add Item
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ItemAdd;
