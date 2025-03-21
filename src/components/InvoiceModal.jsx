import React from "react";

const InvoiceModal = ({ isModalOpen, setIsModalOpen, orderDetails, setOrderDetails, handleSaveChanges }) => {
  return (
    <div className={`modal ${isModalOpen ? "show" : ""}`} style={{ display: isModalOpen ? "block" : "none" }}>
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
            <h5>Edit Customer Details</h5>
            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                className="form-control"
                value={orderDetails.customerName}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, customerName: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={orderDetails.email}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, email: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={orderDetails.phoneNumber}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, phoneNumber: e.target.value })
                }
              />
            </div>

            <h5>Edit Order Items</h5>
            {orderDetails.orderItems.map((item, index) => (
              <div key={index}>
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
                  onChange={(e) => {
                    const updatedQuantity = e.target.value;
                    setOrderDetails({
                      ...orderDetails,
                      orderItems: orderDetails.orderItems.map((i, idx) =>
                        idx === index ? { ...i, quantity: updatedQuantity } : i
                      ),
                    });
                  }}
                  placeholder="Enter quantity"
                />
              </div>
            ))}

            <button className="btn btn-success" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
