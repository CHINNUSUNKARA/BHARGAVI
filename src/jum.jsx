import React from 'react'

const jum = () => {
  return (
    <div>
        <button
                          className="btn btn-warning mx-2"
                          onClick={() => {
                            setCustomerDetails(customer);
                            setEditCustomerId(customer.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-info mx-2"
                          onClick={() => handleViewOrderHistory(customer.id)}
                        >
                          View Order History
                        </button>
    </div>
  )
}

export default jum