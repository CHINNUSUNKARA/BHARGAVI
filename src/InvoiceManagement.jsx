import React, { useState } from "react";
import jsPDF from "jspdf"; // Import jsPDF for PDF generation

const InvoiceManagement = () => {
  // State to manage invoices and order details
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    orderItems: [{ product: "", price: 0, quantity: 1 }],
    orderDate: new Date(),
  });

  const [invoiceHistory, setInvoiceHistory] = useState([]);

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
    // Calculate total amount and tax
    let totalAmount = 0;
    orderDetails.orderItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    const tax = totalAmount * 0.1; // 10% tax for example
    const totalWithTax = totalAmount + tax;

    // Generate Invoice ID
    const invoiceId = "INV-" + Math.floor(Math.random() * 1000000);

    // Create invoice object
    const invoice = {
      invoiceId,
      customerName: orderDetails.customerName,
      orderItems: orderDetails.orderItems,
      orderDate: orderDetails.orderDate,
      totalAmount,
      tax,
      totalWithTax,
    };

    // Add invoice to history
    setInvoiceHistory([...invoiceHistory, invoice]);

    // Generate PDF for the invoice
    generatePDF(invoice);
  };

  // Function to generate the PDF invoice
  const generatePDF = (invoice) => {
    const doc = new jsPDF();
    doc.text(`Invoice ID: ${invoice.invoiceId}`, 10, 10);
    doc.text(`Customer: ${invoice.customerName}`, 10, 20);
    doc.text(`Order Date: ${invoice.orderDate.toDateString()}`, 10, 30);

    doc.text("Items:", 10, 40);
    let y = 50;
    invoice.orderItems.forEach((item) => {
      doc.text(`${item.product} - ${item.price} x ${item.quantity}`, 10, y);
      y += 10;
    });

    doc.text(`Total: ${invoice.totalAmount}`, 10, y + 10);
    doc.text(`Tax (10%): ${invoice.tax}`, 10, y + 20);
    doc.text(`Total with Tax: ${invoice.totalWithTax}`, 10, y + 30);

    // Save the PDF
    doc.save(`${invoice.invoiceId}.pdf`);
  };

  // Function to send email (stubbed)
  const handleEmailInvoice = (invoice) => {
    alert(`Email sent to ${invoice.customerName} with invoice ${invoice.invoiceId}`);
    // Here you would implement email sending logic using an email API or service
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Invoice Management</h2>

      {/* Order Form */}
      <div className="my-4">
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
              <button
                type="button"
                className="btn btn-danger my-2"
                onClick={() => handleRemoveItem(index)}
              >
                Remove Item
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddItem}
          >
            Add Item
          </button>

          <button
            type="button"
            className="btn btn-success my-3"
            onClick={handleGenerateInvoice}
          >
            Generate Invoice
          </button>
        </form>
      </div>

      {/* Invoice History */}
      <div className="my-4">
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
                <td>{invoice.orderDate.toDateString()}</td>
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
  );
};

export default InvoiceManagement;
