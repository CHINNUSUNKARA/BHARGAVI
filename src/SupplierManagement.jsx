import React, { useState } from "react";

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierDetails, setSupplierDetails] = useState({
    name: "",
    contact: "",
    address: "",
    outstandingPayments: false,
    pendingDeliveries: false,
  });

  const [editSupplierId, setEditSupplierId] = useState(null);

  // Handler to add or update supplier
  const handleSaveSupplier = () => {
    if (editSupplierId !== null) {
      const updatedSuppliers = suppliers.map((supplier) =>
        supplier.id === editSupplierId
          ? { ...supplier, ...supplierDetails }
          : supplier
      );
      setSuppliers(updatedSuppliers);
      setEditSupplierId(null); // Reset edit mode
    } else {
      const newSupplier = {
        ...supplierDetails,
        id: suppliers.length + 1,
      };
      setSuppliers([...suppliers, newSupplier]);
    }

    // Reset form
    setSupplierDetails({
      name: "",
      contact: "",
      address: "",
      outstandingPayments: false,
      pendingDeliveries: false,
    });
  };

  // Handler to delete a supplier
  const handleDeleteSupplier = (id) => {
    const filteredSuppliers = suppliers.filter((supplier) => supplier.id !== id);
    setSuppliers(filteredSuppliers);
  };

  // Handler to edit a supplier's details
  const handleEditSupplier = (id) => {
    const supplier = suppliers.find((supplier) => supplier.id === id);
    setSupplierDetails(supplier);
    setEditSupplierId(id); // Set to edit mode
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Supplier Management</h2>

      {/* Supplier Form to Add or Edit Supplier */}
      <div className="my-4">
        <h4>{editSupplierId ? "Edit Supplier" : "Add New Supplier"}</h4>
        <form>
          <div className="mb-3">
            <label className="form-label">Supplier Name</label>
            <input
              type="text"
              className="form-control"
              value={supplierDetails.name}
              onChange={(e) =>
                setSupplierDetails({ ...supplierDetails, name: e.target.value })
              }
              placeholder="Enter supplier name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input
              type="text"
              className="form-control"
              value={supplierDetails.contact}
              onChange={(e) =>
                setSupplierDetails({ ...supplierDetails, contact: e.target.value })
              }
              placeholder="Enter contact number"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={supplierDetails.address}
              onChange={(e) =>
                setSupplierDetails({ ...supplierDetails, address: e.target.value })
              }
              placeholder="Enter supplier address"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Outstanding Payments</label>
            <select
              className="form-control"
              value={supplierDetails.outstandingPayments}
              onChange={(e) =>
                setSupplierDetails({
                  ...supplierDetails,
                  outstandingPayments: e.target.value === "true",
                })
              }
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Pending Deliveries</label>
            <select
              className="form-control"
              value={supplierDetails.pendingDeliveries}
              onChange={(e) =>
                setSupplierDetails({
                  ...supplierDetails,
                  pendingDeliveries: e.target.value === "true",
                })
              }
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveSupplier}
          >
            {editSupplierId ? "Update Supplier" : "Add Supplier"}
          </button>
        </form>
      </div>

      {/* Suppliers Table */}
      <div className="my-4">
        <h4>Suppliers List</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Outstanding Payments</th>
              <th>Pending Deliveries</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.contact}</td>
                <td>{supplier.address}</td>
                <td>{supplier.outstandingPayments ? "Yes" : "No"}</td>
                <td>{supplier.pendingDeliveries ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => handleEditSupplier(supplier.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteSupplier(supplier.id)}
                  >
                    Delete
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

export default SupplierManagement;
