import React, { useState } from "react";
import jsPDF from "jspdf"; // Import jsPDF for PDF generation
import NavBar from "./NavBar";

const InvoiceManagement = () => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    orderItems: [{ product: "", price: 0, quantity: 1 }],
    orderDate: new Date(),
  });

  const [invoiceHistory, setInvoiceHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Handler to add order items
  const handleAddItem = () => {
    setOrderDetails({
      ...orderDetails,
      orderItems: [
        ...orderDetails.orderItems,
        { product: "", price: 0, quantity: 1 },
      ],
    });
  };

  // Handler to remove order items
  const handleRemoveItem = (index) => {
    const updatedItems = [...orderDetails.orderItems];
    updatedItems.splice(index, 1);
    setOrderDetails({ ...orderDetails, orderItems: updatedItems });
  };

  // Handler to handle invoice generation
  const handleGenerateInvoice = () => {
    let totalAmount = 0;
    orderDetails.orderItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    const tax = totalAmount * 0.1; // 10% tax
    const totalWithTax = totalAmount + tax;

    const invoiceId = "INV-" + Math.floor(Math.random() * 1000000);

    const invoice = {
      invoiceId,
      customerName: orderDetails.customerName,
      email: orderDetails.email,
      phoneNumber: orderDetails.phoneNumber,
      orderItems: orderDetails.orderItems,
      orderDate: orderDetails.orderDate,
      totalAmount,
      tax,
      totalWithTax,
    };

    setInvoiceHistory([...invoiceHistory, invoice]);
    generatePDF(invoice); // Generate PDF for the invoice
    handleEmailInvoice(invoice); // Simulated Email
  };

  // Function to generate the PDF invoice
  const generatePDF = (invoice) => {
    const doc = new jsPDF();
    doc.text(`Invoice ID: ${invoice.invoiceId}`, 10, 10);
    doc.text(`Customer: ${invoice.customerName}`, 10, 20);
    doc.text(`Email: ${invoice.email}`, 10, 30); // Added email
    doc.text(`Phone: ${invoice.phoneNumber}`, 10, 40); // Added phone number
    doc.text(`Order Date: ${invoice.orderDate.toLocaleDateString()}`, 10, 50);

    doc.text("Items:", 10, 60);
    let y = 70;
    invoice.orderItems.forEach((item) => {
      doc.text(`${item.product} - ${item.price} x ${item.quantity}`, 10, y);
      y += 10;
    });

    doc.text(`Total: ${invoice.totalAmount}`, 10, y + 10);
    doc.text(`Tax (10%): ${invoice.tax}`, 10, y + 20);
    doc.text(`Total with Tax: ${invoice.totalWithTax}`, 10, y + 30);

    doc.save(`${invoice.invoiceId}.pdf`);
  };

  // Function to send email (simulated)
  const handleEmailInvoice = (invoice) => {
    alert(`Email sent to ${invoice.email} with invoice ${invoice.invoiceId}`);
    // Here you would implement email sending logic using an email API or service like EmailJS, SendGrid, etc.
  };

  // Handler to open the modal to edit the invoice
  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setOrderDetails({
      customerName: invoice.customerName,
      email: invoice.email,
      phoneNumber: invoice.phoneNumber,
      orderItems: invoice.orderItems,
      orderDate: invoice.orderDate,
    });
    setIsModalOpen(true);
  };

  // Handler to save changes in the invoice
  const handleSaveChanges = () => {
    const updatedInvoices = invoiceHistory.map((invoice) =>
      invoice.invoiceId === selectedInvoice.invoiceId
        ? {
            ...invoice,
            customerName: orderDetails.customerName,
            email: orderDetails.email,
            phoneNumber: orderDetails.phoneNumber,
            orderItems: orderDetails.orderItems,
            orderDate: orderDetails.orderDate,
          }
        : invoice
    );
    setInvoiceHistory(updatedInvoices);
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <>
      <NavBar />
      <div className="container custom-margins" style={{ marginTop: "150px" }}>
        <div className="row justify-content-center">
          {/* Invoice Management Heading */}
          <div className="col-12 text-center">
            <h2>Invoice Management</h2>
          </div>
        </div>

        <div className="row d-flex justify-content-between align-items-start mt-4">
          {/* Order Details (Left Column) */}
          <div className="col-md-4">
            <h4>Order Details</h4>
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

              {/* Email and Phone Number */}
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
          </div>

          {/* Order Items (Middle Column) */}
          <div className="col-md-4">
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
                  onChange={(e) =>
                    setOrderDetails({
                      ...orderDetails,
                      orderItems: orderDetails.orderItems.map((i, idx) =>
                        idx === index ? { ...i, quantity: e.target.value } : i
                      ),
                    })
                  }
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

          {/* Invoice History (Right Column) */}
          <div className="col-md-4">
            <h4>Invoice History</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoiceHistory.map((invoice, index) => (
                  <tr key={index}>
                    <td>{invoice.invoiceId}</td>
                    <td>{invoice.customerName}</td>
                    <td>{invoice.orderDate.toLocaleDateString()}</td>
                    <td>{invoice.totalWithTax}</td>
                    <td>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => handleEmailInvoice(invoice)}
                      >
                        Email Invoice
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => handleEditInvoice(invoice)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => generatePDF(invoice)}
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for editing invoice */}
        {isModalOpen && (
          <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Invoice</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
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

                  {/* Edit Email and Phone Number */}
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

                  {/* Edit Order Items */}
                  <h5>Order Items</h5>
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
                        onChange={(e) =>
                          setOrderDetails({
                            ...orderDetails,
                            orderItems: orderDetails.orderItems.map((i, idx) =>
                              idx === index ? { ...i, quantity: e.target.value } : i
                            ),
                          })
                        }
                        placeholder="Enter quantity"
                      />
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InvoiceManagement;
