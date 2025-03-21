// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom"; // Import useLocation
// import jsPDF from "jspdf"; // Import jsPDF for PDF generation
// import NavBar from "./NavBar"; // Assuming you have a NavBar component

// const InvoiceManagement = () => {
//   const [customers, setCustomers] = useState([]); // State to hold customer list
//   const [selectedCustomer, setSelectedCustomer] = useState(null); // State for selected customer
//   const [searchTerm, setSearchTerm] = useState(""); // State for search term

//   // Fetch customers from API (or any data source)
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/customers");
//         const data = await response.json();
//         setCustomers(data);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   // Fetch the passed state from the URL (if available)
//   const { state } = useLocation();
//   const orderDetailsFromState = state?.order; // Get order details from state

//   // Default order details if no state is passed
//   const defaultOrderDetails = orderDetailsFromState || {
//     customerName: "",
//     email: "",
//     phoneNumber: "",
//     orderItems: [{ product: "", price: "", quantity: "" }],
//   };

//   const [orderDetails, setOrderDetails] = useState(defaultOrderDetails);
//   const [invoiceHistory, setInvoiceHistory] = useState([]); // Always initialize as an array
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);

//   // Handler to add order items
//   const handleAddItem = () => {
//     setOrderDetails({
//       ...orderDetails,
//       orderItems: [
//         ...orderDetails.orderItems,
//         { product: "", price: "", quantity: "" },
//       ],
//     });
//   };

//   // Handler to remove order items
//   const handleRemoveItem = (index) => {
//     const updatedItems = [...orderDetails.orderItems];
//     updatedItems.splice(index, 1);
//     setOrderDetails({ ...orderDetails, orderItems: updatedItems });
//   };

//   // Generate invoice, including the PDF and email (simulated)
//   const handleCustomerSelect = (customer) => {
//     setSelectedCustomer(customer); // Set selected customer
//     setOrderDetails({
//       ...orderDetails,
//       customerName: customer.customerName,
//       email: customer.email,
//       phoneNumber: customer.phoneNumber,
//     });
//   };

//   // Generate invoice, including the PDF and email (simulated)
//   const handleGenerateInvoice = () => {
//     if (!selectedCustomer) {
//       alert("Please select a customer before generating an invoice.");
//       return;
//     }

//     let totalAmount = 0;
//     orderDetails.orderItems.forEach((item) => {
//       totalAmount += item.price * item.quantity;
//     });

//     const tax = totalAmount * 0.1; // 10% tax
//     const totalWithTax = totalAmount + tax;
//     const invoiceId = "INV-" + Math.floor(Math.random() * 1000000);

//     const invoice = {
//       orderDate: new Date(),
//       invoiceId,
//       customerName: orderDetails.customerName,
//       email: orderDetails.email,
//       phoneNumber: orderDetails.phoneNumber,
//       orderItems: orderDetails.orderItems,
//       totalAmount,
//       tax,
//       totalWithTax,
//     };

//     setInvoiceHistory([...invoiceHistory, invoice]);
//     generatePDF(invoice); // Generate PDF for the invoice
//     handleEmailInvoice(invoice); // Simulated Email
//   };

//   // Function to generate the PDF invoice
//   const generatePDF = (invoice) => {
//     const doc = new jsPDF();
//     doc.text(`Invoice ID: ${invoice.invoiceId}`, 10, 10);
//     doc.text(`Customer: ${invoice.customerName}`, 10, 20);
//     doc.text(`Email: ${invoice.email}`, 10, 30);
//     doc.text(`Phone: ${invoice.phoneNumber}`, 10, 40);
//     doc.text(`Order Date: ${invoice.orderDate.toLocaleDateString()}`, 10, 50);

//     doc.text("Items:", 10, 60);
//     let y = 70;
//     invoice.orderItems.forEach((item) => {
//       doc.text(`${item.product} - ${item.price} x ${item.quantity}`, 10, y);
//       y += 10;
//     });

//     doc.text(`Total: ${invoice.totalAmount}`, 10, y + 10);
//     doc.text(`Tax (10%): ${invoice.tax}`, 10, y + 20);
//     doc.text(`Total with Tax: ${invoice.totalWithTax}`, 10, y + 30);

//     doc.save(`${invoice.invoiceId}.pdf`);
//   };

//   // Function to send email (simulated)
//   const handleEmailInvoice = (invoice) => {
//     alert(`Email sent to ${invoice.email} with invoice ${invoice.invoiceId}`);
//     // Here you would implement email sending logic using an email API or service like EmailJS, SendGrid, etc.
//   };

//   // Handler to open the modal to edit the invoice
//   const handleEditInvoice = (invoice) => {
//     setSelectedInvoice(invoice);
//     setOrderDetails({
//       customerName: invoice.customerName,
//       email: invoice.email,
//       phoneNumber: invoice.phoneNumber,
//       orderItems: invoice.orderItems,
//       orderDate: invoice.orderDate,
//     });
//     setIsModalOpen(true);
//   };

//   // Handler to save changes in the invoice
//   const handleSaveChanges = () => {
//     const updatedInvoices = invoiceHistory.map((invoice) =>
//       invoice.invoiceId === selectedInvoice.invoiceId
//         ? {
//             ...invoice,
//             customerName: orderDetails.customerName,
//             email: orderDetails.email,
//             phoneNumber: orderDetails.phoneNumber,
//             orderItems: orderDetails.orderItems,
//             orderDate: orderDetails.orderDate,
//           }
//         : invoice
//     );
//     setInvoiceHistory(updatedInvoices);
//     setIsModalOpen(false);
//     setSelectedInvoice(null);
//   };

//   return (
//     <div>
//       <NavBar />
//       <div className="container custom-margins" style={{ marginTop: "150px" }}>
//         <div className="row justify-content-center">
//           <div className="col-12 text-center">
//             <h2>Invoice Management</h2>
//           </div>
//         </div>

//         <div className="row d-flex justify-content-between align-items-start mt-4">
//           {/* Left Column - Order Details */}
//           <div className="col-md-4">
//             <h4>Order Details</h4>
//             <form>
//               <div className="mb-3">
//                 <label className="form-label">Customer Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={orderDetails.customerName}
//                   onChange={(e) =>
//                     setOrderDetails({ ...orderDetails, customerName: e.target.value })
//                   }
//                   placeholder="Enter customer name"
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Email Address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   value={orderDetails.email}
//                   onChange={(e) =>
//                     setOrderDetails({ ...orderDetails, email: e.target.value })
//                   }
//                   placeholder="Enter email"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Phone Number</label>
//                 <input
//                   type="tel"
//                   className="form-control"
//                   value={orderDetails.phoneNumber}
//                   onChange={(e) =>
//                     setOrderDetails({ ...orderDetails, phoneNumber: e.target.value })
//                   }
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-success my-3"
//                 onClick={handleGenerateInvoice}
//               >
//                 Generate Invoice
//               </button>
//             </form>
//           </div>

//           {/* Middle Column - Order Items */}
//           <div className="col-md-4">
//             <h4>Order Items</h4>
//             {orderDetails.orderItems.map((item, index) => (
//               <div key={index} className="mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={item.product}
//                   onChange={(e) =>
//                     setOrderDetails({
//                       ...orderDetails,
//                       orderItems: orderDetails.orderItems.map((i, idx) =>
//                         idx === index ? { ...i, product: e.target.value } : i
//                       ),
//                     })
//                   }
//                   placeholder="Enter product name"
//                 />
//                 <input
//                   type="number"
//                   className="form-control my-2"
//                   value={item.price}
//                   onChange={(e) =>
//                     setOrderDetails({
//                       ...orderDetails,
//                       orderItems: orderDetails.orderItems.map((i, idx) =>
//                         idx === index ? { ...i, price: e.target.value } : i
//                       ),
//                     })
//                   }
//                   placeholder="Enter price"
//                 />
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={item.quantity}
//                   onChange={(e) => {
//                     const updatedQuantity = e.target.value;
//                     setOrderDetails({
//                       ...orderDetails,
//                       orderItems: orderDetails.orderItems.map((i, idx) =>
//                         idx === index ? { ...i, quantity: updatedQuantity } : i
//                       ),
//                     });
//                   }}
//                   placeholder="Enter quantity"
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-danger my-2"
//                   onClick={() => handleRemoveItem(index)}
//                 >
//                   Remove Item
//                 </button>
//               </div>
//             ))}
//             <button type="button" className="btn btn-primary" onClick={handleAddItem}>
//               Add Item
//             </button>
//           </div>

//           {/* Right Column - Invoice History */}
//           <div className="col-md-4">
//             <h4>Invoice History</h4>
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>Invoice ID</th>
//                   <th>Customer Name</th>
//                   <th>Order Date</th>
//                   <th>Total Amount</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {invoiceHistory.map((invoice, index) => (
//                   <tr key={index}>
//                     <td>{invoice.invoiceId}</td>
//                     <td>{invoice.customerName}</td>
//                     <td>{invoice.orderDate.toLocaleDateString()}</td>
//                     <td>{invoice.totalWithTax}</td>
//                     <td>
//                       <button
//                         className="btn btn-primary mx-2"
//                         onClick={() => handleEmailInvoice(invoice)}
//                       >
//                         Email Invoice
//                       </button>
//                       <button
//                         className="btn btn-info"
//                         onClick={() => handleEditInvoice(invoice)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-info"
//                         onClick={() => generatePDF(invoice)}
//                       >
//                         Download PDF
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Modal for editing invoice */}
//         {isModalOpen && (
//           <div className="modal show" style={{ display: "block" }}>
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Edit Invoice</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setIsModalOpen(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   {/* Modal for editing customer details and order items */}
//                   <h5>Edit Customer Details</h5>
//                   <div className="mb-3">
//                     <label className="form-label">Customer Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={orderDetails.customerName}
//                       onChange={(e) =>
//                         setOrderDetails({ ...orderDetails, customerName: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       value={orderDetails.email}
//                       onChange={(e) =>
//                         setOrderDetails({ ...orderDetails, email: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Phone Number</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={orderDetails.phoneNumber}
//                       onChange={(e) =>
//                         setOrderDetails({ ...orderDetails, phoneNumber: e.target.value })
//                       }
//                     />
//                   </div>

//                   {/* Order Items Section */}
//                   <h5>Edit Order Items</h5>
//                   {orderDetails.orderItems.map((item, index) => (
//                     <div key={index}>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={item.product}
//                         onChange={(e) =>
//                           setOrderDetails({
//                             ...orderDetails,
//                             orderItems: orderDetails.orderItems.map((i, idx) =>
//                               idx === index ? { ...i, product: e.target.value } : i
//                             ),
//                           })
//                         }
//                         placeholder="Enter product name"
//                       />
//                       <input
//                         type="number"
//                         className="form-control my-2"
//                         value={item.price}
//                         onChange={(e) =>
//                           setOrderDetails({
//                             ...orderDetails,
//                             orderItems: orderDetails.orderItems.map((i, idx) =>
//                               idx === index ? { ...i, price: e.target.value } : i
//                             ),
//                           })
//                         }
//                         placeholder="Enter price"
//                       />
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={item.quantity}
//                         onChange={(e) => {
//                           const updatedQuantity = e.target.value;
//                           setOrderDetails({
//                             ...orderDetails,
//                             orderItems: orderDetails.orderItems.map((i, idx) =>
//                               idx === index ? { ...i, quantity: updatedQuantity } : i
//                             ),
//                           });
//                         }}
//                         placeholder="Enter quantity"
//                       />
//                     </div>
//                   ))}

//                   <button className="btn btn-success" onClick={handleSaveChanges}>
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InvoiceManagement;
