import React from "react";

const InvoiceHistory = ({ invoiceHistory, handleEmailInvoice, handleEditInvoice, generatePDF }) => {
  return (
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
  );
};

export default InvoiceHistory;
