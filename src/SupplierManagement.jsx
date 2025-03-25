import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { getSuppliers, addSupplier, updateSupplier} from "./services/suppliersApi"; // Import API functions

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

  // Load suppliers from API on component mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const suppliersData = await getSuppliers();
        setSuppliers(suppliersData);
      } catch (error) {
        console.error("Error fetching suppliers", error);
      }
    };
    fetchSuppliers();
  }, []);

  // Handle Add or Edit Supplier
  const handleSaveSupplier = async () => {
    if (editSupplierId !== null) {
      try {
        const updatedSupplier = await updateSupplier(editSupplierId, supplierDetails);
        setSuppliers(suppliers.map((supplier) => (supplier.id === editSupplierId ? updatedSupplier : supplier)));
        setEditSupplierId(null); // Reset edit mode
      } catch (error) {
        console.error("Error updating supplier", error);
      }
    } else {
      try {
        const newSupplier = await addSupplier(supplierDetails);
        setSuppliers([...suppliers, newSupplier]);
      } catch (error) {
        console.error("Error adding supplier", error);
      }
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

  return (
    <div>
      <NavBar />
      <div className="container custom-margins" style={{ marginTop: "70px", marginLeft: '250px', padding: '20px', width: 'auto', overflow: 'hidden', height: '100vh' }}>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default SupplierManagement;
