import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import InvoiceForm from "./InvoiceForm";
import InvoiceHistory from "./InvoiceHistory";
import InvoiceModal from "./InvoiceModal";
import NavBar from "../NavBar";

const InvoiceManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    orderItems: [{ product: "", price: "", quantity: "" }],
  });
  const [invoiceHistory, setInvoiceHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

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

  const { state } = useLocation();
  const orderDetailsFromState = state?.order || orderDetails;

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    setOrderDetails({
      ...orderDetails,
      orderItems: [...orderDetails.orderItems, { product: "", price: "", quantity: "" }],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...orderDetails.orderItems];
    updatedItems.splice(index, 1);
    setOrderDetails({ ...orderDetails, orderItems: updatedItems });
  };

  const handleGenerateInvoice = () => {
    if (!selectedCustomer) {
      alert("Please select a customer before generating an invoice.");
      return;
    }

    let totalAmount = 0;
    orderDetails.orderItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    const tax = totalAmount * 0.1;
    const totalWithTax = totalAmount + tax;
    const invoiceId = "INV-" + Math.floor(Math.random() * 1000000);

    const invoice = {
      orderDate: new Date(),
      invoiceId,
      customerName: orderDetails.customerName,
      email: orderDetails.email,
      phoneNumber: orderDetails.phoneNumber,
      orderItems: orderDetails.orderItems,
      totalAmount,
      tax,
      totalWithTax,
    };

    setInvoiceHistory([...invoiceHistory, invoice]);
    generatePDF(invoice);
    handleEmailInvoice(invoice);
  };

  const generatePDF = (invoice) => {
    const doc = new jsPDF();
    doc.text(`Invoice ID: ${invoice.invoiceId}`, 10, 10);
    doc.text(`Customer: ${invoice.customerName}`, 10, 20);
    doc.text(`Email: ${invoice.email}`, 10, 30);
    doc.text(`Phone: ${invoice.phoneNumber}`, 10, 40);
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

  const handleEmailInvoice = (invoice) => {
    alert(`Email sent to ${invoice.email} with invoice ${invoice.invoiceId}`);
  };

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

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setOrderDetails({
      ...orderDetails,
      customerName: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
    });
  };

  return (
    <div>
      <NavBar />
      <div className="container custom-margins" style={{ marginTop: "150px" }}>
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h2>Invoice Management</h2>
          </div>
        </div>
        <div className="row d-flex justify-content-between align-items-start mt-4">
          {/* Left Column - Order Details */}
          <InvoiceForm
            orderDetails={orderDetails}
            setOrderDetails={setOrderDetails}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            handleGenerateInvoice={handleGenerateInvoice}
          />

          {/* Right Column - Invoice History */}
          <InvoiceHistory
            invoiceHistory={invoiceHistory}
            handleEmailInvoice={handleEmailInvoice}
            handleEditInvoice={handleEditInvoice}
            generatePDF={generatePDF}
          />
        </div>

        {/* Customer Search */}
        <div className="row mt-4">
          <div className="col-12">
            <input
              type="text"
              placeholder="Search Customers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
            <ul>
              {filteredCustomers.map((customer) => (
                <li key={customer.id} onClick={() => handleSelectCustomer(customer)}>
                  {customer.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <InvoiceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
          handleSaveChanges={handleSaveChanges}
        />
      </div>
    </div>
  );
};

export default InvoiceManagement;
