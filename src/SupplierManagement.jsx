import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { getSuppliers, addSupplier, updateSupplier, deleteSupplier } from "./services/suppliersApi"; // Import API functions

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(()=>{
    if(searchTerm){
      const filteredSuppliers = suppliers.filter((supplier) => 
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
      || supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
      || supplier.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuppliers(filteredSuppliers);
      } else {
        setFilteredSuppliers([]);
        }
        }, [searchTerm, suppliers]); 
  // Handle Search Change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fetch Suppliers on Mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const suppliersData = await getSuppliers();
        setSuppliers(suppliersData);
        setFilteredSuppliers(suppliersData); // Set filteredSuppliers initially
      } catch (error) {
        console.error("Error fetching suppliers", error);
      }
    };
    fetchSuppliers();
  }, []);

  // Open Modal to Edit Supplier
  const openModal = (supplier) => {
    setSelectedSupplier(supplier);
    setSupplierDetails({
      name: supplier.name,
      contact: supplier.contact,
      address: supplier.address,
      outstandingPayments: supplier.outstandingPayments,
      pendingDeliveries: supplier.pendingDeliveries,
    });
    setEditSupplierId(supplier.id);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
    setSupplierDetails({
      name: "",
      contact: "",
      address: "",
      outstandingPayments: false,
      pendingDeliveries: false,
    });
  };

  // Handle Save Supplier (Add/Edit)
  const handleSaveSupplier = async () => {
    if (editSupplierId !== null) {
      try {
        const updatedSupplier = await updateSupplier(editSupplierId, supplierDetails);
        setSuppliers(suppliers.map((supplier) => (supplier.id === editSupplierId ? updatedSupplier : supplier)));
        setEditSupplierId(null); // Reset edit mode
        alert("Supplier updated successfully!");
      } catch (error) {
        console.error("Error updating supplier", error);
      }
    } else {
      try {
        const newSupplier = await addSupplier(supplierDetails);
        setSuppliers([...suppliers, newSupplier]);
        alert("Supplier added successfully!");
      } catch (error) {
        console.error("Error adding supplier", error);
      }
    }

    // Reset form after saving
    setSupplierDetails({
      name: "",
      contact: "",
      address: "",
      outstandingPayments: false,
      pendingDeliveries: false,
    });
    setIsModalOpen(false);
  };

  // Handle Delete Supplier
  const handleDeleteSupplier = async (id) => {
    try {
      await deleteSupplier(id); // Call delete API
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id)); // Remove from list
      alert("Supplier deleted successfully!");
    } catch (error) {
      console.error("Error deleting supplier", error);
      alert("Error deleting supplier.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container custom-margins" style={{ marginTop: "70px", marginLeft: '250px', padding: '20px', width: 'auto', overflow: 'hidden', height: '100vh' }}>
        <h2 className="text-center ">Supplier Management</h2>

        {/* Supplier Form to Add or Edit Supplier */}
        <div className="row overflow-hidden">
          <div className="col-md-4 ">
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
                    required
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
                    required
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
                    required
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

          {/* Supplier Search and Table */}
          <div className="col-md-7">
            <div className="my-4">
              <h4>Search Supplier</h4>
              <input
                type="text"
                placeholder="Search suppliers"
                className="form-control"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <table className="table table-bordered mt-4">
                <thead>
                  <tr>
                    <th>Supplier Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id}> {/* Use id as key */}
                      <td>{supplier.name}</td>
                      <td>{supplier.contact}</td>
                      <td>{supplier.address}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => openModal(supplier)}
                        >
                          Modify
                        </button>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => handleDeleteSupplier(supplier.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredSuppliers.length === 0 && searchTerm && (
                <p>No suppliers found with that name.</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal for Editing Supplier */}
        {isModalOpen && selectedSupplier && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="supplierModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="supplierModalLabel">
                    Supplier Details
                  </h5>
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
                      setSupplierDetails({
                        name: selectedSupplier.name,
                        contact: selectedSupplier.contact,
                        address: selectedSupplier.address,
                        outstandingPayments: selectedSupplier.outstandingPayments,
                        pendingDeliveries: selectedSupplier.pendingDeliveries,
                      });
                      setEditSupplierId(selectedSupplier.id);
                      setIsModalOpen(false);
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
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
