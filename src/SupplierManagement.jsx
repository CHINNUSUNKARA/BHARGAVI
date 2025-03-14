import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

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
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedSupplier, setSelectedSupplier] = useState(null); 

  // Load suppliers from localStorage on component mount
  useEffect(() => {
    const savedSuppliers = localStorage.getItem("suppliers");
    if (savedSuppliers) {
      setSuppliers(JSON.parse(savedSuppliers));
    }
  }, []);

  // Save suppliers to localStorage whenever the list changes
  useEffect(() => {
    if (suppliers.length > 0) {
      localStorage.setItem("suppliers", JSON.stringify(suppliers));
    }
  }, [suppliers]);

  // Handle Add or Edit Supplier
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

  // Handle Delete Supplier
  const handleDeleteSupplier = (id) => {
    const filteredSuppliers = suppliers.filter((supplier) => supplier.id !== id);
    setSuppliers(filteredSuppliers);
    setIsModalOpen(false); 
  };

  // Handle Edit Supplier (opens modal)
  const openModal = (supplier) => {
    setSelectedSupplier(supplier); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div>
      <NavBar />
      <div className="container custom-margins" style={{ marginTop: "150px" }}>
        <h2 className="text-center">Supplier Management</h2>

        {/* Supplier Form to Add or Edit Supplier */}
        <div className="row">
          <div className="col-md-6">
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
          </div>

          {/* Suppliers List */}
          <div className="col-md-6">
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
                          className="btn btn-warning"
                          onClick={() => openModal(supplier)} 
                        >
                          Modify
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Supplier Details Modal */}
        {isModalOpen && selectedSupplier && (
          <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="supplierModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="supplierModalLabel">Supplier Details</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Name:</strong> {selectedSupplier.name}</p>
                  <p><strong>Contact:</strong> {selectedSupplier.contact}</p>
                  <p><strong>Address:</strong> {selectedSupplier.address}</p>
                  <p><strong>Outstanding Payments:</strong> {selectedSupplier.outstandingPayments ? "Yes" : "No"}</p>
                  <p><strong>Pending Deliveries:</strong> {selectedSupplier.pendingDeliveries ? "Yes" : "No"}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteSupplier(selectedSupplier.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setSupplierDetails(selectedSupplier);
                      setEditSupplierId(selectedSupplier.id);
                      closeModal();
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierManagement;
